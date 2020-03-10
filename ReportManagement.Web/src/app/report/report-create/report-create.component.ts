import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from 'src/services/report.services';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {

  userDataSubscription;
  userData;
  userName;
  reportCreateForm : FormGroup;
  public reportDetailList: FormArray;
  reportFormData : any = {}

  minDate: Date;
  maxDate: Date;

  showFeedback;

  constructor(private router: Router,
    private reportService: ReportService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate());

      this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
        this.userData = data;
        this.userName = this.userData.fullName;
      })
     }

  ngOnInit() {
    this.reportCreateForm = this.formBuilder.group({
      createdDate: [''],
      reportsdetails: this.formBuilder.array([this.createReports()])
    });

    this.reportDetailList = this.reportCreateForm.get('reportsdetails') as FormArray;

    const formData = JSON.parse(localStorage.getItem('report-create-data'));
    if(JSON.parse(localStorage.getItem('report-create-data'))) {
      const formData = JSON.parse(localStorage.getItem('report-create-data'));
      console.log(formData);
      //this.reportCreateForm.controls = formData;

      
      // formData.reportDetail.forEach(element => {
      //   console.log(element.reportPlan);
      //   console.log(element.reportDetail);
      //   this.reportCreateForm.controls['reportsdetails'].setValue(element.reportPlan);
      // });
      //this.reportCreateForm.setControl('reportPlan', formData.reportDetail.reportPlan);
    }
  }

  get f(){
    return this.reportCreateForm.controls;
  }

  createReports(): FormGroup{
    return this.formBuilder.group({
      Plan: '',
      Details: '',
      Progress: ''
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
      this.reportDetailList.removeAt(this.reportDetailList.length - 1);
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }


  createReportData(){
    
  }

  checkDate() {
    if(this.reportCreateForm.get('createdDate').value === "") {
      let date: Date = new Date();
      this.reportFormData.report.CreatedDate = date;
      console.log(this.reportFormData.report.CreatedDate);
    }
    else {
      console.log(this.reportCreateForm.get('createdDate').value);
    }
  }


  onFormSubmit(){
    this.reportFormData = {'report' : {}, 'reportDetail' : []};
    this.reportFormData.report.UserID = this.userData.userId;

    this.checkDate();
    this.reportFormData.report.ReportStatus = true;
    //this.reportFormData.report.CreatedDate = this.reportCreateForm.controls['createdDate'].value;
    this.reportFormData.reportDetail = this.reportDetailList.value;
    //localStorage.setItem('report-create-data', JSON.stringify(this.reportFormData));


    this.reportService.saveReport(this.reportFormData).subscribe(data =>{
      console.log(data);
      this.showFeedback = data.message;
    },
    error => {
      this.showFeedback = error;
    }
    );
    //this.router.navigate(['/report'])

    console.log("report added succesfully");
  }

}
