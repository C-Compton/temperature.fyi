import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Observable, forkJoin } from "rxjs";

@Component({
  selector: "app-location-detail-container",
  templateUrl: "./location-detail-container.component.html",
  styleUrls: ["./location-detail-container.component.css"]
})
export class LocationDetailContainerComponent implements OnInit {
  public data: Observable<any>;
  public id: string;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.data = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get("id");
        return this.getData(this.id, true);
      })
    );
  }

  public getData(id: string, historical: boolean) {
    return forkJoin([
      this.dataService.getMaxTempAverage(id, historical),
      this.dataService.getMinTempAverage(id, historical),
      this.dataService.getExtremeColdEvents(id, historical),
      this.dataService.getExtremeHeatEvents(id, historical),
      this.dataService.getExtremePrecipEvents(id, historical)
    ]);
  }

  public routeBack() {
    this.router.navigate([""]);
  }

  public getDataWithNewType(type: boolean) {
    this.data = this.getData(this.id, !type);
  }
}
