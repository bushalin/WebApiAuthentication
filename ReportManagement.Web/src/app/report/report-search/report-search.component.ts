import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportService } from "src/services/report.services";

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
    private reportService: ReportService
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
    this.reportService
      .searchReport(this.employeeId, this.createdDate)
      .subscribe(data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });
        console.log(this.reportList);
      });
  }
}
