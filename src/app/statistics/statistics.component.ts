import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StatisticsService } from "./statistics.service";




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

  constructor(private statsService: StatisticsService) {}

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
}

  // public lineChartData: Array<any> = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  // ];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: any = {
  //   responsive: true
  // };
  // public lineChartColors: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  // public lineChartLegend: boolean = true;
  // public lineChartType: string = 'line';

  // public randomize(): void {
  //   const _lineChartData: Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }

  // // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }
  // ngOnInit() {

  // }
  // ngOnDestroy() {

  // }
}
