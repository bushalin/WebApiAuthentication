import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.services';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {

  reportCreateForm : FormGroup;
  public reportDetailList: FormArray;

  constructor(private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.reportCreateForm = this.formBuilder.group({
      reportsdetails: this.formBuilder.array([this.createReports()])
    });

    this.reportDetailList = this.reportCreateForm.get('reportsdetails') as FormArray;
    console.log(this.reportDetailList.value);
  }

  get f(){
    return this.reportCreateForm.controls;
  }

  createReports(): FormGroup{
    return this.formBuilder.group({
      reportPlan: '',
      reportDetail: '',
      reportProgress: ''
    })
  }

  addReports() {
    if (this.reportDetailList.length < 10) {
      this.reportDetailList.push(this.createReports());
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }

  removeReports(){
    if (this.reportDetailList.length > 1) {
      this.reportDetailList.removeAt(0);
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }

  onFormSubmit(){
    console.log(this.reportCreateForm.value);
  }
}
