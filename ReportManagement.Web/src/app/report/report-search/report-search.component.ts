import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-report-search",
  templateUrl: "./report-search.component.html",
  styleUrls: ["./report-search.component.css"]
})
export class ReportSearchComponent implements OnInit {
  employeeId: string;
  createdDate: string;
  reportList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    //Spinner effect implemented. spinner will work while data is being loaded from server
    // resource: https://www.c-sharpcorner.com/article/how-to-add-loaderspinner-in-angular-8-application/
    private SpinnerService: NgxSpinnerService
  ) {
    this.route.queryParamMap.subscribe(params => {
      if (params.has("employeeId")) {
        this.employeeId = params.get("employeeId");
      }
      if (!params.has("employeeId")) {
        this.employeeId = null;
      }
      if (params.has("createdDate")) {
        this.createdDate = params.get("createdDate");
      }
      if (!params.has("createdDate")) {
        this.createdDate = null;
      }
    });
    console.log(this.employeeId);
    console.log(this.createdDate);
    this.searchReport();
  }

  ngOnInit() {}

  searchReport() {
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.reportService
      .searchReport(this.employeeId, this.createdDate)
      .subscribe(data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });
        //after fetching data, spinner will hide
        this.SpinnerService.hide();
        console.log(this.reportList);
      });
  }
}
