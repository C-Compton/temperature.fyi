import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-location-detail-container",
  templateUrl: "./location-detail-container.component.html",
  styleUrls: ["./location-detail-container.component.css"]
})
export class LocationDetailContainerComponent implements OnInit {
  public data: Observable<any>;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.dataService.getCityData(params.get("id"));
      })
    );
  }
}
