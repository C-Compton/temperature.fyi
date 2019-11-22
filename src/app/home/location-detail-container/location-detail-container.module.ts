import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationDetailContainerComponent } from "./location-detail-container.component";
import { LocationDetailComponent } from "./location-detail/location-detail.component";
import { ChartsModule } from "ng2-charts";
import { HighchartsChartModule } from "highcharts-angular";
import * as Highcharts from "highcharts";
import { NzSpinModule } from "ng-zorro-antd/spin";

@NgModule({
  declarations: [LocationDetailContainerComponent, LocationDetailComponent],
  imports: [CommonModule, ChartsModule, HighchartsChartModule, NzSpinModule]
})
export class LocationDetailContainerModule {}
