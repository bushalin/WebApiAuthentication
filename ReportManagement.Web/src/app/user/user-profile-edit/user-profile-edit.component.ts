import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserProfileEdit, User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { CommonService } from 'src/services/common.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  userDataSubscription;
  userData = new User();
  loading = false;
  profileUpdateForm: FormGroup;
  submitted = false;
  gender: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private router: Router) {
      this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
        this.userData = data;
      });
     }

  ngOnInit() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      gender: [""],
      phone: [""],
      jobTitle: [""],
      post_address: [""],
      address: [""]
    });
    this.setUserData();
    this.gender = this.userData.sex;
  }

  setUserData() {
    this.commonService.getUserInfoById(this.userData.userId).subscribe(
      data => {
        this.profileUpdateForm.get("firstName").patchValue(data.firstName);
        this.profileUpdateForm.get("lastName").patchValue(data.lastName);
        this.profileUpdateForm.get("jobTitle").patchValue(data.jobTitle);
        this.profileUpdateForm.get("address").patchValue(data.address);
        this.profileUpdateForm.get("post_address").patchValue(data.address_PostCode);
        this.profileUpdateForm.get("phone").patchValue(data.phone);
        this.profileUpdateForm.get("gender").setValue(data.sex);
      }
    )
    
  }

  get profileUpdateFormControl() {
    return this.profileUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileUpdateForm.invalid) {
      return;
    }

    let profileEditModel = new UserProfileEdit();

    profileEditModel.UserId = this.userData.userId;
    profileEditModel.FirstName = this.profileUpdateForm.controls['firstName'].value; 
    //profileEditModel.FirstName = this.profileUpdateForm.get('firstName').value;
    profileEditModel.LastName = this.profileUpdateForm.controls['lastName'].value; 
    profileEditModel.Address = this.profileUpdateForm.controls['address'].value; 
    profileEditModel.Address_PostCode = this.profileUpdateForm.controls['post_address'].value; 
    profileEditModel.Phone = this.profileUpdateForm.controls['phone'].value; 
    profileEditModel.Sex = this.profileUpdateForm.controls['gender'].value; 
    profileEditModel.JobTitle = this.profileUpdateForm.controls['jobTitle'].value; 

    console.log(this.profileUpdateForm.value);
    console.log(profileEditModel);
    this.commonService.updateProfile(profileEditModel).subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/user']);
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
          this.router.navigate(['/user']);
        });
      },
      error => {
        console.log(error);
      }
    )
    
    
    this.loading = true;
  }

}
