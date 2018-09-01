import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import * as OktaAuth from '@okta/okta-auth-js';
import { AuthService } from "../auth.service";
import { environment } from "../../../environments/environment";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  authClient: any;
  token: any;
  private oktaUrl = environment.oktaUrl;
  private clientId = environment.oktaClientId;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.oktaLogin();
  }

  oktaLogin() {
    this.authClient = new OktaAuth({
      url: this.oktaUrl,
      issuer: `${this.oktaUrl}/oauth2/default`,
      redirectUri: `http://localhost:${window.location.port}/implicit/callback`,
      clientId: this.clientId
    });

    this.token = this.authClient.tokenManager.get('idToken');
    if (this.token) {
      // this.isAuthenticated = true;
      // this.username = this.token.claims.email;
    } else {
      // this.isAuthenticated = false;
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
