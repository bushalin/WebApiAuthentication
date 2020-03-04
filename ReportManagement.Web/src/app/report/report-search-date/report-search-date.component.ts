import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-report-search-date',
  templateUrl: './report-search-date.component.html',
  styleUrls: ['./report-search-date.component.css']
})
export class ReportSearchDateComponent implements OnInit {
  userId = "632922b2-5375-4aff-93a7-d552dca01a38"; // NOTICE: should change the method of setting the user information.
  userName = "Imran"; // user information will be set using login service.
  githubData: any;

  customClass = "customClass";
  isFirstOpen = false;

  // list for showing the form data
  reportList: any[] = [];
  testList = [];
  test_oneList: any;

  constructor(
    private route: Router,
    private reportService: ReportService,
    private http: HttpClient
  ) {
    this.getReportListByUserId();
  }

  ngOnInit() {
    console.log(this.reportList);
    //this.getAllReportList();
  }

  getReportListByUserId() { // NOTICE: should change the method by Created Date.
    this.reportService.getReportById(this.userId).subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
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
      err => {}
    );
  }
}
