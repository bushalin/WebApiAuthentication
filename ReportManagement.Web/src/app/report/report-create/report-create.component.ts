import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { AuthenticationService } from "src/services/authentication.service";
import { map } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { jaLocale } from "ngx-bootstrap/locale";
defineLocale("ja", jaLocale);

@Component({
  selector: "app-report-create",
  templateUrl: "./report-create.component.html",
  styleUrls: ["./report-create.component.css"]
})
export class ReportCreateComponent implements OnInit {
  userDataSubscription;
  userData;
  userName;
  reportCreateForm: FormGroup;
  public reportDetailList: FormArray;
  reportFormData: any = {};

  minDate: Date;
  maxDate: Date;

  loading = false;
  submitted = false;

  modalRef: BsModalRef;
  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-xl"
  };

  constructor(
    private router: Router,
    private reportService: ReportService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use("ja");
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate());

    this.userDataSubscription = this.authService.userData
      .asObservable()
      .subscribe(data => {
        this.userData = data;
        this.userName = this.userData.fullName;
      });
  }

  ngOnInit() {
    this.reportCreateForm = this.formBuilder.group({
      createdDate: [""],
      reportsdetails: this.formBuilder.array([this.createReports()])
    });

    this.reportDetailList = this.reportCreateForm.get(
      "reportsdetails"
    ) as FormArray;

    //this.getLocalFormData().subscribe(data => this.reportCreateForm = data);
  }

  // getLocalFormData() {
  //   //const formData = JSON.parse(localStorage.getItem('report-create-data'));
  //   if(JSON.parse(localStorage.getItem('report-create-data'))) {
  //     const formData = JSON.parse(localStorage.getItem('report-create-data'));
  //     console.log(formData);
  //     //this.reportCreateForm.controls = formData;

  //     return formData.pipe(
  //       map((data: any) => this.formBuilder.group({
  //         createdDate: [data.createdDate],
  //         reportsdetails: this.formBuilder.array(data.reportDetail.map(rd => this.generateReportDetail(rd)))
  //       }))
  //     )
  //   }
  // }

  // generateReportDetail(rd) {
  //   const reportDetailForm = this.formBuilder.group({
  //     Plan: [rd.Plan],
  //     Details: [rd.Details],
  //     Progress: [rd.Progress]
  //   });

  //   return reportDetailForm;
  // }

  get f() {
    return this.reportCreateForm.controls;
  }

  get detailsFormData() {
    return <FormArray>this.reportCreateForm.get("reportsdetails");
  }

  createReports(): FormGroup {
    return this.formBuilder.group({
      Plan: ["", Validators.required],
      Details: ["", Validators.required],
      Progress: [
        "",
        [
          Validators.pattern("^[0-9]+(.[0-9])?$"),
          Validators.min(0),
          Validators.max(100)
        ]
      ]
    });
  }

  addReports() {
    if (this.reportDetailList.length < 10) {
      this.reportDetailList.push(this.createReports());
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }

  removeReports() {
    if (this.reportDetailList.length > 1) {
      this.reportDetailList.removeAt(this.reportDetailList.length - 1);
      console.log(this.reportCreateForm.controls.reportsdetails.value);
    }
  }

  createReportData() {}

  checkDate() {
    if (this.reportCreateForm.get("createdDate").value === "") {
      let date: Date = new Date();
      this.reportFormData.report.CreatedDate = date;
      console.log(this.reportFormData.report.CreatedDate);
    } else {
      console.log(this.reportCreateForm.get("createdDate").value);
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const num = event.which ? event.which : event.value;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    // if(event.target.value >10){

    //   return false;
    // }
    return true;
  }

  onFormSubmit(template: TemplateRef<any>) {
    this.submitted = true;
    if (this.reportCreateForm.invalid) {
      return;
    }
    this.loading = true;

    this.reportFormData = { report: {}, reportDetail: [] };
    this.reportFormData.report.UserID = this.userData.userId;

    this.reportFormData.report.CreatedDate = this.reportCreateForm.controls[
      "createdDate"
    ].value;

    if (this.reportCreateForm.get("createdDate").value === "") {
      let date: Date = new Date();
      this.reportFormData.report.CreatedDate = date;
      console.log(this.reportFormData.report.CreatedDate);
    } else {
      console.log(this.reportCreateForm.get("createdDate").value);
    }

    this.reportFormData.report.ReportStatus = true;
    this.reportFormData.reportDetail = this.reportDetailList.value;
    localStorage.setItem(
      "report-create-data",
      JSON.stringify(this.reportFormData)
    );
    console.log(this.reportFormData);

    this.modalRef = this.modalService.show(template, this.modalConfig);

    //console.log("report added succesfully");
  }

  modalConfirm() {
    // calling api to save data
    console.log(this.reportFormData);
    this.reportService.saveReport(this.reportFormData).subscribe(
      data => {
        console.log(data);
        //this.showFeedback = data.message;
      },
      error => {
        //this.showFeedback = error;
      }
    );
    this.modalRef.hide();
    this.router.navigate(["/report"]);
  }

  modalDecline() {
    this.submitted = false;
    if (this.reportCreateForm.invalid) {
      return;
    }
    this.loading = false;

    this.modalRef.hide();
  }
}
