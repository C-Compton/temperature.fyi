import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.css"]
})
export class LocationDetailComponent implements OnInit, OnChanges {
  @Input() data: any;
  public Highcharts: typeof Highcharts = Highcharts;
  public loading: boolean = true;
  public chartOptions: any = {
    series: [
      {
        data: [1, 2, 3],
        type: "line",
        name: "Avg. Max Temperature"
      },
      {
        data: [1, 2, 3],
        type: "line",
        name: "Avg. Min Temperature"
      }
    ],
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Temperature (F)"
      }
    },
    title: {
      text: "Average Min / Max Temperatures"
    }
  };
  public updateFlag: boolean = false;

  constructor() {}

  ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange) {
      this.loading = false;
      console.log(this.data[0].data);
      this.chartOptions.series[0].data = Object.keys(
        this.data[0].data
      ).map(i => [i, +this.data[0].data[i].avg.toFixed(2)]);

      this.chartOptions.series[1].data = Object.keys(
        this.data[1].data
      ).map(i => [i, +this.data[1].data[i].avg.toFixed(2)]);

      this.chartOptions.xAxis.categories = Object.keys(
        this.data[0].data
      ).map(i => [i.substr(0, 4)]);

      this.updateFlag = true;
    }
  }
}
