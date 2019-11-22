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
    return this.http.get(URL + "city/?search=" + searchString, {
      headers: headers
    });
  }

  public getCityData(cityId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(URL + "climate-data/" + cityId + "/historical/", {
      headers: headers
    });
  }

  public getMaxTempAverage(cityId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        "/historical/indicator/average_high_temperature/?time_aggregation=quarterly&agg=avg",
      {
        headers: headers
      }
    );
  }

  public getMinTempAverage(cityId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(
      URL +
        "climate-data/" +
        cityId +
        "/historical/indicator/average_low_temperature/?time_aggregation=quarterly&agg=avg",
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
