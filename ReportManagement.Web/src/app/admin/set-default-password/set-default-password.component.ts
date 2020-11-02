import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "src/services/common.services";
import { MustMatch } from "src/helper/must-match.validator";
import { UserService } from 'src/services/user.service';
import { ResetPassword } from 'src/models/common';
import { AccountService } from 'src/services/account.service';

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
  resetPasswordFormData: any = {};

  constructor(
    private commonService: CommonService,
    private userSerivce: UserService,
    private accountService: AccountService,
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
    this.userSerivce.getAllUsers().subscribe(
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

    let passwordResetModel = new ResetPassword();
    passwordResetModel.UserId = this.setPasswordForm.controls['employeeNameSelectedValue'].value;
    passwordResetModel.NewPassword = this.setPasswordForm.controls['password'].value;

    this.accountService.resetPassword(passwordResetModel).subscribe(
      data => {
        console.log(data);
        alert("Password Changed successfully");
      },
      error => {
        console.log(error);
      }
      
    )
  }
}
