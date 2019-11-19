import { Component, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"]
})
export class SearchInputComponent {
  public selectedValue = null;
  public listOfOption: Array<{ value: string; text: string }> = [];
  public nzFilterOption = () => true;
  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor(private dataService: DataService) {}

  public getCities(value: string): void {
    this.dataService.getCityId(value).subscribe(data => {
      const listOfOption: Array<{ value: string; text: string }> = [];
      data.features.forEach(item => {
        listOfOption.push({
          value: item.id,
          text: item.properties.name + ", " + item.properties.admin
        });
      });
      this.listOfOption = listOfOption;
    });
  }

  public emit() {
    this.search.emit(this.selectedValue);
  }
}
