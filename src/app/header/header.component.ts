import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { User } from "../core/models/user";
import { shareReplay, last, tap } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userName: string;
  userAvatar: string;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      const user = this.authService.getUser();
      this.userName = user.userName;
      this.userAvatar  = user.userAvatar;
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .pipe(shareReplay(1), tap(user => console.log(user, 'here')))
      .subscribe((user: User) => {
        if (!user) {
          this.userIsAuthenticated = false;
          return;
        }
        this.userIsAuthenticated = user.isAuthenticated;
        this.userName = user.userName;
        this.userAvatar  = user.userAvatar;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
