import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from 'src/services/report.services';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.css']
})
export class ReportCreateComponent implements OnInit {

  reportCreateForm : FormGroup;
  public reportDetailList: FormArray;
  reportFormData : any = {}

  minDate: Date;
  maxDate: Date;

  constructor(private router: Router,
    private reportService: ReportService,
    private formBuilder: FormBuilder) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate());
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
      this.reportDetailList.removeAt(this.reportDetailList.length - 1);
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }


  createReportData(){
    
  }


  onFormSubmit(){
    this.reportFormData = {'report' : {}, 'reportDetail' : []};
    this.reportFormData.report.UserID = "1dd77da5-8a67-4729-923c-3224bbccf460";
    this.reportFormData.report.ReportStatus = true;
    this.reportFormData.report.CreatedDate = this.reportCreateForm.controls['createdDate'].value;
    this.reportFormData.reportDetail = this.reportDetailList.value;
    localStorage.setItem('report-create-data', JSON.stringify(this.reportFormData));


    this.reportService.saveReport(this.reportFormData).subscribe(data =>{
      console.log(data);
    },
    error => {}
    );

    this.router.navigate(['/view-report'])

    //console.log("report added succesfully");
  }

}
