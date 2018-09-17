import { Component, OnInit, } from "@angular/core";
// import { Subscription } from "rxjs";

import { AuthService } from "./auth/auth.service";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from "@angular/router";
// import { ErrorService } from "./error/error.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  // hasError = false;
  // private errorSub: Subscription;
  public loadingRouter = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadingRouter = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadingRouter = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.authService.autoAuthUser();
    // this.errorSub = this.errorService.getErrorListener().subscribe(
    //   message => this.hasError = message !== null
    // );
  }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
