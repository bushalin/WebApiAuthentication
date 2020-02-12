import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ReportService {
  header;
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set("content-type", "application/json");
    this.header.set("Accept", "application/json");
  }

  // URL: api/Report/SaveReport
  saveReport(saveReportObject: any) {
    return this.http
      .post<any>(
        environment.apiUrl + `Report/SaveReport`,
        JSON.stringify({ saveReportObject }),
        { headers: this.header }
      )
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // URL: api/Report/GetReportById/1dd77da5-8a67-4729-923c-3224bbccf460
  getReportById(id) {
    return this.http
      .get<any>(environment.apiUrl + `report/getreportbyid/` + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getAllReports() {
    return this.http.get<any>(environment.apiUrl + `report/getallreports`).pipe(
      map(res => {
        return res;
      })
    );
  }

  getTestData() {
      const result =  this.http.get<any>(environment.apiUrl + `test/GetTestData`).pipe(
          map(res => {
              return res;
          })
      );

      console.log(result);
      return result;
  }
}