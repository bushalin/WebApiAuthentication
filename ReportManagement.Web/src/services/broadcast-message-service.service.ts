import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BroadcastMessageServiceService {
  header;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken")
    });
  }

  // URL: api/broadcast/GetRecentMessages
  getRecentBroadcastMessage() {
    return this.http
      .get<any>(environment.apiUrl + `broadcast/GetRecentMessages`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // URL: api/Broadcast/SaveBroadcastMessage
  saveBroadcastMessage(saveMessageObj: any) {
    return this.http
      .post<any>(
        environment.apiUrl + `Broadcast/SaveBroadcastMessage`,
        JSON.stringify(saveMessageObj),
        { headers: this.header }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
