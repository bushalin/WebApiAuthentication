import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-report-search-name',
  templateUrl: './report-search-name.component.html',
  styleUrls: ['./report-search-name.component.css']
})
export class ReportSearchNameComponent implements OnInit {
  userId = "632922b2-5375-4aff-93a7-d552dca01a38"; // NOTICE: THIS IS USED FOR TEST PURPOSE. SHOULD CHANGE THE WAY OF GETTING INFO.
  
  // list for showing the data
  reportList: any[] = [];

  constructor(
    private route: Router,
    private reportService: ReportService,
    private http: HttpClient
  ) {
    this.getReportListByUserId();
  }

  ngOnInit() {
    console.log(this.reportList); // FOR TESTING
    //this.getAllReportList();
  }

  getReportListByUserId() {
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
