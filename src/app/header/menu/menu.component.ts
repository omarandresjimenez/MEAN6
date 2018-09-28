import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from "@angular/router";
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { shareReplay, last, tap } from "rxjs/operators";
import { AuthService } from '../../auth/auth.service';
import { User } from '../../core/models/user';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  public loadingRouter = false;
  // overlap = false;

  watcher: Subscription;

  constructor(media: ObservableMedia, private router: Router, private authService: AuthService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  userIsAuthenticated = false;
  userName: string;
  userAvatar: string;
  private authListenerSubs: Subscription;


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
  goLink(page) {
    switch (page) {
      case 'home':
        this.router.navigate([ '/'] );
        break;
      case 'create':
        this.router.navigate([ '/create'] );
        break;
      case 'statistics':
        this.router.navigate([ '/statistics'] );
        break;
      default:
        break;
    }
  }

}
