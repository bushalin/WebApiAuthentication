import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../helper/must-match.validator'

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  loading = false;
  changePasswordForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder
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
    console.log(this.changePasswordForm.value);
  }

}
