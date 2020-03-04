import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: "app-report-user-view",
  templateUrl: "./report-user-view.component.html",
  styleUrls: ["./report-user-view.component.css"]
})
export class ReportUserViewComponent implements OnInit {
  userId;
  userName;
  githubData: any;

  userDataSubscription;
  userData;

  customClass = "customClass";
  isFirstOpen = false;

  // list for showing the form data
  reportList: any[] = [];

  constructor(
    private route: Router,
    private reportService: ReportService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      //This will come from the seperate api call of login function. not from token
      this.userName = this.userData.fullName;
      this.userId = this.userData.userId;
    })
    this.getReportListByUserId();
  }

  ngOnInit() {
    console.log(this.reportList);
  }

  getReportListByUserId() {
    this.reportService.getReportByUserId(this.userId).subscribe(
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
