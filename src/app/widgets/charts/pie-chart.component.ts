import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-chart-pie',
    template: `<div style="width:100%">
                 <canvas
                    baseChart
                    [chartType]="'pie'"
                    [datasets]="chartData"
                    [labels]="chartLabels"
                    [options]="chartOptions"
                    [legend]="true"
                    (chartClick)="onChartClick($event)">
                </canvas>
               </div>`,
  })
  export class ChartPieComponent implements OnChanges {
    @Input()
    chartData: any[] = [];
    chartLabels: any[] = [ '' ];
    @Input()
    chartOptions: any =  {
                          responsive: true
                        };

    @Output()
    chartClick =  new EventEmitter<any>(null);


    ngOnChanges() {
        this.chartLabels = this.chartData[0].xLabels;
     }

    onChartClick(event) {
        this.chartClick.emit(event);
      }
  }
