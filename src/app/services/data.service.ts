import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getCityId(searchString: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL + "city/?search=" + searchString + "&ordering=population",
      {
        headers: headers
      }
    );
  }

  public getCityData(cityId: string, historical: boolean): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(URL + "climate-data/" + cityId + "/historical/", {
      headers: headers
    });
  }

  public getMaxTempAverage(
    cityId: string,
    historical: boolean
  ): Observable<any> {
    let headers = new HttpHeaders();
    let scenario = historical ? "/historical/" : "/RCP85/";
    let time_aggregation;
    if (scenario == "/historical/") {
      time_aggregation = "quarterly";
    } else {
      time_aggregation = "yearly";
    }
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        scenario +
        "indicator/average_high_temperature/?time_aggregation=" +
        time_aggregation +
        "&agg=avg",
      {
        headers: headers
      }
    );
  }

  public getMinTempAverage(
    cityId: string,
    historical: boolean
  ): Observable<any> {
    let scenario = historical ? "/historical/" : "/RCP85/";
    let time_aggregation;
    if (scenario == "/historical/") {
      time_aggregation = "quarterly";
    } else {
      time_aggregation = "yearly";
    }
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        scenario +
        "indicator/average_low_temperature/?time_aggregation=" +
        time_aggregation +
        "&agg=avg",
      {
        headers: headers
      }
    );
  }

  public getExtremeColdEvents(
    cityId: string,
    historical: boolean
  ): Observable<any> {
    let scenario = historical ? "/historical/" : "/RCP85/";
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        scenario +
        "indicator/extreme_cold_events/?agg=max",
      {
        headers: headers
      }
    );
  }

  public getExtremeHeatEvents(
    cityId: string,
    historical: boolean
  ): Observable<any> {
    let scenario = historical ? "/historical/" : "/RCP85/";
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        scenario +
        "indicator/extreme_heat_events/?agg=max",
      {
        headers: headers
      }
    );
  }

  public getExtremePrecipEvents(
    cityId: string,
    historical: boolean
  ): Observable<any> {
    let scenario = historical ? "/historical/" : "/RCP85/";
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        scenario +
        "indicator/extreme_precipitation_events/?agg=max",
      {
        headers: headers
      }
    );
  }

  public getIndicators() {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(URL + "indicator/", {
      headers: headers
    });
  }
}
