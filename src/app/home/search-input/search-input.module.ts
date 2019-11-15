import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchInputComponent } from "./search-input.component";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    ReactiveFormsModule
  ],
  exports: [SearchInputComponent]
})
export class SearchInputModule {}
