
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GridComponent } from "./grid.component";
import { GridRoutingModule } from "./grid.routing";


@NgModule({
  declarations: [
    GridComponent,
  ],
  imports: [
    GridRoutingModule,
    CommonModule,
  ],
})
export class GridModule {}
