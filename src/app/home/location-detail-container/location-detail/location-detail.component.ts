import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.css"]
})
export class LocationDetailComponent implements OnInit {
  @Input() data: ClimateData;
  public mapData: any;
  constructor() {}

  ngOnInit() {}
}
