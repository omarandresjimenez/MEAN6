import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";
import { User } from "../core/models/user";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private user: User;
  private authStatusListener = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return (this.user) ? this.user.userId : '';
  }

  getUser() {
    return this.user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, userName: string, userAvatar: File | string) {
    let authData: any | FormData;
    if (typeof userAvatar === "object") {
      authData = new FormData();
      authData.append("email", email);
      authData.append("password", password);
      authData.append("userName", userName);
      authData.append("image", userAvatar);
    } else {
      authData = { email: email, password: password, userName: userName, userAvatar: '' };
    }
    this.http.post(BACKEND_URL + "/signup", authData).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        this.authStatusListener.next(null);
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string; userName: string; userAvatar: string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          const user: User = { isAuthenticated: false, userName: '', userAvatar: '', userId: ''};
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            user.isAuthenticated = true;
            user.userId = response.userId;
            user.userName = response.userName;
            user.userAvatar = response.userAvatar;
            this.user = user;
            this.authStatusListener.next(user);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.user);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(null);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(this.user);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(null);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  setAuthTimer(duration: number) {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, user: User) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("user", JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user
    };
  }
}
