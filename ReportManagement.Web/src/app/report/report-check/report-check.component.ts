import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode
} from "ngx-bootstrap/datepicker";
import { ReportService } from 'src/services/report.services';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { jaLocale } from "ngx-bootstrap/locale";
import { NgxSpinnerService } from 'ngx-spinner';
defineLocale("ja", jaLocale);

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
  maxDate: Date;


  // For table draw dates
  collectedDate;
  staticDays = [];
  staticDate = new Date();
  reportData: any[] = [];

  constructor(private datePipe: DatePipe,
    private bsLocaleService: BsLocaleService,
    private reportService: ReportService,
    //Spinner effect implemented. spinner will work while data is being loaded from server
    // resource: https://www.c-sharpcorner.com/article/how-to-add-loaderspinner-in-angular-8-application/
    private SpinnerService: NgxSpinnerService) {
      this.bsLocaleService.use("ja");
      this.maxDate = new Date();
      this.maxDate.setDate(this.maxDate.getDate());
    }

  ngOnInit() {
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
        dateInputFormat: 'MMM YYYY'
      }
    );
    this.collectedDate = new Date();
    this.onPressed();
    // this.getReportData();
    console.log(this.reportData);
  }

  getReportData(currentMonth) {
    
    this.reportData = [];
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.reportService.reportCheck(currentMonth).subscribe(data => {
      Object.entries(data).map(res => {
        this.reportData.push(res[1]);
      });
      //after fetching data, spinner will hide
      this.SpinnerService.hide();
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

  preventType(event): boolean {
    return false;
  }

  preventBackspace(event): boolean {
    return false;
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
