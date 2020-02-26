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
    // this.header = new HttpHeaders().set("Content-Type", "application/json");
    // this.header.set("Accept", "application/json");

    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // URL: api/Report/SaveReport
  saveReport(saveReportObj: any) {
    return this.http
      .post<any>(
        environment.apiUrl + `Report/SaveReport`,
        JSON.stringify(saveReportObj),
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
      .get<any>(environment.apiUrl + `report/getreportbyuserid/` + id)
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

  getRecentReports() {
    return this.http.get<any>(environment.apiUrl + `Report/GetRecentReports`).pipe(
      map(res => {
        return res;
      })
    );
  }
  

  getTestData() {
    const result = this.http
      .get<any>(environment.apiUrl + `test/GetTestData`)
      .pipe(
        map(res => {
          return res;
        })
      );
    return result;
  }

  getGitData() {
    return this.http.get<any>(environment.apiUrl + `users/bushalin`).pipe(
      map(res => {
        return res;
      })
    );
  }
}
