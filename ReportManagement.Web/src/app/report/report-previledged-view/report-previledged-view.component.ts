import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { CommonService } from "src/services/common.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { isUndefined } from 'util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';

@Component({
  selector: "app-report-previledged-view",
  templateUrl: "./report-previledged-view.component.html",
  styleUrls: ["./report-previledged-view.component.css"]
})
export class ReportPreviledgedViewComponent implements OnInit {
  reportSearchForm: FormGroup;
  reportList: any[] = [];
  employeeId: string;
  createdDate: string;
  selectedOption: any;
  userList:  any[] = [];

  constructor(
    private route: Router,
    private reportService: ReportService,
    private commonService: CommonService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.getRecentReports();
    console.log(this.reportList);
    this.getAllUsers();

  }

  ngOnInit() {
    console.log(this.reportList);
    console.log(this.userList);
    this.reportSearchForm = this.formBuilder.group({
      employeeNameSelectedValue: [''],
      dateSelectedValue: ['']
    });
  }

  get f(){
    return this.reportSearchForm.controls;
  }

  getRecentReports() {
    this.reportService.getRecentReports().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });
      },
      err => {}
    );
  }


  getAllUsers() {
    this.commonService.getAllUsers().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.userList.push(res[1]);
        });
      },
      err => {}
    );
  }

  onClickSearch() {
      this.employeeId = this.reportSearchForm.controls['employeeNameSelectedValue'].value;
      let tempDate = this.reportSearchForm.controls['dateSelectedValue'].value;
      this.createdDate = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
      // console.log(this.employeeId);
      // console.log(this.createdDate);
      if(isUndefined(this.employeeId)) {this.employeeId = ''};
      if((this.employeeId === '' && this.createdDate !== '') || isUndefined(this.employeeId)) {
        this.route.navigate(["/report/show/search"], { queryParams: { createdDate: this.createdDate }});
        console.log(this.createdDate);
      }
      if(this.employeeId !== '' && this.createdDate === '') {
        this.route.navigate(["/report/show/search"], { queryParams: { employeeId: this.employeeId }});
        console.log(this.employeeId);
      }
      if(this.employeeId !== '' && this.createdDate !== '') {
        this.route.navigate(["/report/show/search"], { queryParams: { employeeId: this.employeeId, createdDate: this.createdDate }});
        console.log(this.employeeId);
        console.log(this.createdDate);
      }
      if((this.employeeId === '' && this.createdDate === '') || isUndefined(this.employeeId)) { console.log("putki mara kha!")};
      //this.route.navigate(["/search-report"], { queryParams: { employeeId: this.employeeId, createdDate: this.createdDate }});

  }


  // onSelect(event: TypeaheadMatch): void {
  //   this.selectedOption = event.item['userId'];
  // }
}
