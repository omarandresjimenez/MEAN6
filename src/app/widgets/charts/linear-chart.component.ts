import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-chart-line',
    template: `<div style="width:100%">
                 <canvas
                    baseChart
                    [chartType]="'line'"
                    [datasets]="chartData"
                    [labels]="chartLabels"
                    [options]="chartOptions"
                    [legend]="true"
                    (chartClick)="onChartClick($event)">
                </canvas>
               </div>`,
  })
  export class ChartLineComponent implements OnChanges {
    @Input()
    chartData: any[] = [];
    @Input()
    chartOptions: any =  {
                          responsive: true
                        };

    @Output()
    chartClick =  new EventEmitter<any>(null);

    chartLabels: any[] = [ '' ];


    ngOnChanges() {
       this.chartLabels = this.chartData[0].xLabels;

    }

    onChartClick(event) {
        this.chartClick.emit(event);
      }
  }
