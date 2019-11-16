import { Component, Output, OnInit } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"]
})
export class SearchInputComponent {
  @Output() search: EventEmitter<string> = new EventEmitter();
  public searchText = new FormControl("");

  public submit(): void {
    this.search.emit(this.searchText.value);
  }
}
