import { Component, OnInit, HostListener } from '@angular/core';
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
  prevPassIncorrect = false;
  alerts: any[] = [];
  constructor( private route: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6),
         Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[x20-x7E]).*$")]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
  });
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    //this.loading = true;
    //console.log(this.changePasswordForm.value);

    let changePasswordModel = new ChangePassword();
    changePasswordModel.OldPassword = this.changePasswordForm.controls['previousPassword'].value;
    changePasswordModel.NewPassword = this.changePasswordForm.controls['newPassword'].value;
    changePasswordModel.ConfirmPassword = this.changePasswordForm.controls['confirmPassword'].value;

    this.commonService.changePassword(changePasswordModel).subscribe(
      data => {
        console.log(data);
        // this.changePasswordForm.reset();
        // this.alerts.push({
        //   type: 'info',
        //   msg: `Password Changed Successfully`,
        //   timeout: 3000,
        // });

        alert("パスワードは正常に変更されました");
        
        this.route.navigate(["/user"]);
      },
      () => { 
        //this.changePasswordForm.reset();
        this.changePasswordForm.setErrors({
          invalidPreviousPass: true,
        });
        this.prevPassIncorrect = true;
       }
    );

  }

}
