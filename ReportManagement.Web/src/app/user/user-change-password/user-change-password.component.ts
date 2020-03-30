import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../helper/must-match.validator'
import { ChangePassword } from 'src/models/user';
import { CommonService } from 'src/services/common.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  loading = false;
  changePasswordForm: FormGroup;
  submitted = false;
  constructor( private route: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
  });
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    //console.log(this.changePasswordForm.value);

    let changePasswordModel = new ChangePassword();
    changePasswordModel.OldPassword = this.changePasswordForm.controls['previousPassword'].value;
    changePasswordModel.NewPassword = this.changePasswordForm.controls['newPassword'].value;
    changePasswordModel.ConfirmPassword = this.changePasswordForm.controls['confirmPassword'].value;

    console.log(changePasswordModel);

    this.commonService.changePassword(changePasswordModel).subscribe(
      data => {
        console.log(data)
      },
      error => { }
    );

    this.route.navigate(["/user"]);
  }

}
