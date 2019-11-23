import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-location-detail",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.css"]
})
export class LocationDetailComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Output() dataType: EventEmitter<boolean> = new EventEmitter();
  public historical: boolean = false;
  public Highcharts: typeof Highcharts = Highcharts;
  public loading: boolean = true;
  public chartOptions1: any = {
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

  public chartOptions2: any = {
    series: [
      {
        data: [1, 2, 3],
        type: "line",
        name: "Extreme Heat Events"
      },
      {
        data: [1, 2, 3],
        type: "line",
        name: "Extreme Cold Events"
      },
      {
        data: [1, 2, 3],
        type: "line",
        name: "Extreme Precipitation Events"
      }
    ],
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Count"
      }
    },
    title: {
      text: "Extreme Weather Events"
    }
  };
  public updateFlag: boolean = false;

  constructor() {}

  ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange && changes.data.currentValue != undefined) {
      this.loading = false;
      this.chartOptions1.series[0].data = Object.keys(
        this.data[0].data
      ).map(i => [i, +this.data[0].data[i].avg.toFixed(2)]);

      this.chartOptions1.series[1].data = Object.keys(
        this.data[1].data
      ).map(i => [i, +this.data[1].data[i].avg.toFixed(2)]);

      this.chartOptions1.xAxis.categories = Object.keys(
        this.data[0].data
      ).map(i => [i.substr(0, 4)]);

      this.chartOptions2.series[1].data = Object.keys(
        this.data[2].data
      ).map(i => [i, +this.data[2].data[i].max]);

      this.chartOptions2.series[0].data = Object.keys(
        this.data[3].data
      ).map(i => [i, +this.data[3].data[i].max]);

      this.chartOptions2.series[2].data = Object.keys(
        this.data[4].data
      ).map(i => [i, +this.data[4].data[i].max]);

      this.chartOptions2.xAxis.categories = Object.keys(
        this.data[2].data
      ).map(i => [i]);

      this.updateFlag = true;
    }
  }

  public dataTypeChange() {
    this.loading = true;
    this.dataType.emit(this.historical);
  }

  public backClick() {
    this.back.emit();
  }
}
