import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from 'protractor';

@Component({
  selector: "app-report-user-view",
  templateUrl: "./report-user-view.component.html",
  styleUrls: ["./report-user-view.component.css"]
})
export class ReportUserViewComponent implements OnInit {
  userId = "1dd77da5-8a67-4729-923c-3224bbccf460";

  // list for showing the form data
  reportList = [];
  testList = [];
  test_oneList : any;

  constructor(private route: Router, private reportService: ReportService) {}

  ngOnInit() {
    this.getReportList();
    this.getAllReportList();
    this.getTestData();
    this.printValues();
  }

  getReportList() {
    this.reportService.getReportById(this.userId).subscribe(
      data => {
        data.foreach(element => {
          this.reportList.push({
            firstName : element.FirstName,
            lastName: element.lastName
          })
        })
      },
      error => { }
    );
  }

  getAllReportList() {
    this.reportService.getAllReports().subscribe(
      data => {
        this.test_oneList = data;
      },
      error => {}
    );
  }

  getTestData() {
    this.reportService.getTestData().subscribe(
      data => {
        data.forEach(element => {
          this.test_oneList.push({
            Id: element.Id,
            Name: element.Name,
            Description: element.Description
          })
        });
      }
    );
  }

  printValues() {
    console.log(this.reportList);
    console.log(this.testList);
    console.log(this.test_oneList);
  }
}
