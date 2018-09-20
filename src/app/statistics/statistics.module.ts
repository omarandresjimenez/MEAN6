import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

 import { ChartsModule } from "ng2-charts";

import { StatisticsComponent } from "./statistics.component";
import { StatisticsRoutingModule } from "./statistics-router.module";
import { AngularMaterialModule } from "../angular-material.module";
import { ChartLineComponent } from "../widgets/charts/linear-chart.component";
import { ChartPieComponent } from "../widgets/charts/pie-chart.component";


@NgModule({
  declarations: [StatisticsComponent, ChartLineComponent, ChartPieComponent
                ],
  imports: [
       CommonModule,
       StatisticsRoutingModule,
       AngularMaterialModule,
      ChartsModule,
]
})
export class StatisticsModule {}
