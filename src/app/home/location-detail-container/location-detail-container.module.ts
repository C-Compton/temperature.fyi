import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationDetailContainerComponent } from "./location-detail-container.component";
import { LocationDetailComponent } from "./location-detail/location-detail.component";
import { ChartsModule } from "ng2-charts";
import { HighchartsChartModule } from "highcharts-angular";
import * as Highcharts from "highcharts";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocationDetailContainerComponent, LocationDetailComponent],
  imports: [
    CommonModule,
    ChartsModule,
    HighchartsChartModule,
    NzSpinModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzSwitchModule,
    FormsModule
  ]
})
export class LocationDetailContainerModule {}
