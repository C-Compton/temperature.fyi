import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector: "app-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.css"]
})
export class SearchInputComponent implements OnInit {
  @Output() search: EventEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
