import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from 'rxjs';
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/stats/";

@Injectable({ providedIn: "root" })
export class StatisticsService implements OnDestroy, OnInit {
  private statisticsUpdated = new Subject< any[] >();
  private timerid: any;
  private connect = true;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {

  }

  getStatisticsStream() {
     this.timerid = setInterval( () => {
      this.http
        .get<any>(
          BACKEND_URL
        )
        .pipe()
        .subscribe((data: any) => {
          this.statisticsUpdated.next(data);
        }); } , 1000);
  }

  getStatisticsUpdateListener() {
    return this.statisticsUpdated.asObservable();
  }

  toogleConnection(forcestop: boolean = false) {
    if (this.connect || forcestop) {
      clearInterval(this.timerid);
    } else {
      clearInterval(this.timerid);
      this.getStatisticsStream();
    }
    this.connect = !this.connect;
  }

  ngOnDestroy() {
      clearInterval(this.timerid);
  }
}
