import { Component, OnInit, OnDestroy } from "@angular/core";




@Component({
  selector: "app-stat",
  templateUrl: "./stat1.component.html",
})
export class StatComponent implements OnInit, OnDestroy {

  chartData: any[];
  chartLabels: any[];
  chartOptions: any;
constructor() {
}

  ngOnInit() {
    this.initChart();
  }

  private  initChart() {
    this.chartData = [  {data: [65, 59, 80, 81], label: 'Series A'}];
    this.chartLabels = ['mon', 'tue', 'wed', 'thu'];
    this.chartOptions = { responsive: true };
  }
  ngOnDestroy() {
  }


}
