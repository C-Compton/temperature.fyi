import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { SearchInputModule } from "./search-input/search-input.module";
import { NzGridModule } from "ng-zorro-antd/grid";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SearchInputModule, NzGridModule]
})
export class HomeModule {}
