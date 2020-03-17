import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "src/services/common.services";
import { MustMatch } from "src/helper/must-match.validator";

@Component({
  selector: "app-set-default-password",
  templateUrl: "./set-default-password.component.html",
  styleUrls: ["./set-default-password.component.css"]
})
export class SetDefaultPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  employeeId: string;

  userList: any[] = [];

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.getAllUsers();
  }

  ngOnInit() {
    this.setPasswordForm = this.formBuilder.group(
      {
        employeeNameSelectedValue: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  get setPasswordFormControl() {
    return this.setPasswordForm.controls;
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

  onSubmit() {
    this.submitted = true;
    if (this.setPasswordForm.invalid) {
      return;
    }
    this.loading = true;

    console.log(this.setPasswordForm.value);
  }
}
