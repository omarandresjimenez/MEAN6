import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StatisticsService } from "./statistics.service";
import { DialogService } from "../core/services/dialog.service";




@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {

  chartData: any[];
  chartOptions: any;

  private statsListenerSubs: Subscription;
  private data: any;

  constructor(private statsService: StatisticsService,
              private dialog: DialogService) {}

  ngOnInit() {
    this.initChart();
    this.statsService.getStatisticsStream();
    this.statsListenerSubs = this.statsService
      .getStatisticsUpdateListener()
      .subscribe((data: any) => {
        const d = new Date();
        this.chartData = this.chartData.slice(0);
        this.chartData[0].data.shift();
        this.chartData[0].data.push(Math.floor(+data.point));
        this.chartData[1].data.shift();
        this.chartData[1].data.push(Math.floor(Math.random() * 1000));
        this.chartData[0].xLabels.shift();
        this.chartData[0].xLabels.push( d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
      });
  }

  private  initChart() {
    const chartLabels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.chartData = [  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series A', xLabels: chartLabels},
                        {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Series B', xLabels: []}];
    this.chartOptions = {
      responsive: true,
      easing: 'linear',
      animation: false,
      scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  } };
  }
  ngOnDestroy() {
    this.statsListenerSubs.unsubscribe();
    this.statsService.toogleConnection(true);
  }
onClick() {
  this.statsService.toogleConnection();
  this.dialog.success('Succesfully Toggled');
}

}
