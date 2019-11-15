import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { SearchInputModule } from "./search-input/search-input.module";
import { NzGridModule } from "ng-zorro-antd/grid";
import { LocationDetailContainerModule } from "./location-detail-container/location-detail-container.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SearchInputModule,
    NzGridModule,
    LocationDetailContainerModule
  ]
})
export class HomeModule {}
