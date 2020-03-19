import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode
} from "ngx-bootstrap/datepicker";
import { ReportService } from 'src/services/report.services';

@Component({
  selector: "app-report-check",
  templateUrl: "./report-check.component.html",
  styleUrls: ["./report-check.component.css"]
})
export class ReportCheckComponent implements OnInit {
  // BsDatePicker config
  bsValue: Date = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  minMode: BsDatepickerViewMode = "month";

  // For table draw dates
  collectedDate;
  staticDays = [];
  staticDate = new Date();
  reportData: any[] = [];

  constructor(private datePipe: DatePipe,
    private reportService: ReportService) {
    }

  ngOnInit() {
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode
      }
    );
    this.collectedDate = new Date();
    this.onPressed();
    // this.getReportData();
    console.log(this.reportData);
  }

  getReportData(currentMonth) {
    this.reportData = [];
    this.reportService.reportCheck(currentMonth).subscribe(data => {
      Object.entries(data).map(res => {
        this.reportData.push(res[1]);
      });
    });
  }

  // For populating selected month's day info
  getDaysInMonth(month) {
    while (this.staticDate.getMonth() === month) {
      console.log(this.staticDate.getMonth());
      this.staticDays.push(
        this.datePipe.transform(this.staticDate, "yyyy-MM-dd")
      );
      this.staticDate.setDate(this.staticDate.getDate() + 1);
    }
  }

  onPressed() {
    this.staticDays = [];
    let currentMonth = this.datePipe.transform(this.collectedDate, "yyyy-MM-dd");
    this.getReportData(currentMonth);
    let setStaticDate_Year = Number(
      this.datePipe.transform(this.collectedDate, "yyyy")
    );
    let setStaticDate_Month =
      Number(this.datePipe.transform(this.collectedDate, "MM")) - 1;
    this.staticDate = new Date(setStaticDate_Year, setStaticDate_Month, 1);

    this.getDaysInMonth(setStaticDate_Month);
    console.log(this.staticDays);
  }
}
