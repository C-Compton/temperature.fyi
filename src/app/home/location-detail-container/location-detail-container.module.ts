import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationDetailContainerComponent } from "./location-detail-container.component";
import { LocationDetailComponent } from "./location-detail/location-detail.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [LocationDetailContainerComponent, LocationDetailComponent],
  imports: [CommonModule, ChartsModule]
})
export class LocationDetailContainerModule {}
