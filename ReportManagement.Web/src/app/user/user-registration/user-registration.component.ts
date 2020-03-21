import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.services';
import { UserCreate } from 'src/models/user';
import { Router } from "@angular/router";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../helper/must-match.validator'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  loading = false;
  userCreateForm: FormGroup;
  submitted = false;

  userFormData : any = {}

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private commonService: CommonService
    ) { }

    ngOnInit() {
      this.userCreateForm = this.formBuilder.group({
        userName: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          isActiveEmployee: [true],
          isEmployeeProfile: [true]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
  }



    // convenience getter for easy access to form fields
    get userCreateFormControl() {
      return this.userCreateForm.controls;
    }

    onSubmit() {
      this.submitted = true;
      if (this.userCreateForm.invalid) {
        return;
      }
      //this.loading = true;
      let userModel = new UserCreate();
  
      userModel.Email = this.userCreateForm.controls['email'].value;
      userModel.FirstName = this.userCreateForm.controls['firstName'].value;
      userModel.LastName = this.userCreateForm.controls['lastName'].value;
      userModel.UserName = this.userCreateForm.controls['userName'].value;
      userModel.Password = this.userCreateForm.controls['password'].value;
      userModel.ConfirmPassword = this.userCreateForm.controls['confirmPassword'].value;
      userModel.IsActiveEmployee = this.userCreateForm.controls['isActiveEmployee'].value;
      userModel.IsEmployeeProfile = this.userCreateForm.controls['isEmployeeProfile'].value;
  
      console.log(userModel);
      
  
      this.commonService.userRegistration(userModel).subscribe(data =>{
        console.log(data);
        this.router.navigate(['/user/list']);
      },
      error => {}
      );
    }

}


