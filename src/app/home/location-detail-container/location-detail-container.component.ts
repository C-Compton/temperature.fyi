import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable, forkJoin } from "rxjs";

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
        let id = params.get("id");
        return forkJoin([
          this.dataService.getMaxTempAverage(id),
          this.dataService.getMinTempAverage(id)
        ]);
      })
    );
  }
}
