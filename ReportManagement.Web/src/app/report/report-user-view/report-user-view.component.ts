import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-report-user-view",
  templateUrl: "./report-user-view.component.html",
  styleUrls: ["./report-user-view.component.css"]
})
export class ReportUserViewComponent implements OnInit {
  userId = "1dd77da5-8a67-4729-923c-3224bbccf460";
  userName = "Imran";
  githubData : any;

  // list for showing the form data
  reportList : any[] = [];
  testList = [];
  test_oneList : any;

  constructor(private route: Router, private reportService: ReportService, private http: HttpClient) {
    this.getReportListByUserId();
  }

  ngOnInit() {
    console.log(this.reportList);
    //this.getAllReportList();
  }

  getReportListByUserId() {
    this.reportService.getReportById(this.userId).subscribe(
      data => {

        Object.entries(data).map(res => {
          this.reportList.push(res[1])
        });

        // data.foreach(element => {  
        //   this.reportList.push({
        //     firstName : element.FirstName,
        //     lastName: element.lastName
        //   })
        // })
        //this.reportList = JSON.parse(JSON.stringify(data));
        //this.reportList = data.value;
      },
      err => { }
    );
  }

  getAllReportList() {
    this.reportService.getAllReports().subscribe(
      data => {
        this.test_oneList = data;
      },
      err => {}
    );
  }

  // getTestData() {
  //   this.reportService.getTestData().subscribe(
  //     data => {
  //       data.forEach(element => {
  //         this.test_oneList.push({
  //           Id: element.Id,
  //           Name: element.Name,
  //           Description: element.Description
  //         })
  //       });
  //     }
  //   );
  // }
}
