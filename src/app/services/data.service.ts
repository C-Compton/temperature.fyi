import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const URL =
  "https://stage-deployment--sleepy-brahmagupta-baff68.netlify.com/.netlify/functions/rest/api/";

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

  public getCityData(cityId: string): Observable<any>{
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(URL + "climate-data/" + cityId + "/historical/", {
      headers: headers
    });
  }
}
