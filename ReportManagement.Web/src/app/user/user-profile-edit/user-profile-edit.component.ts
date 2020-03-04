import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  loading = false;
  profileUpdateForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: ["", Validators.required],
      phone: ["", Validators.required],
      jobTitle: ["", Validators.required],
      post_address: ["", Validators.required],
      address: ["", Validators.required]
    });
  }

  get profileUpdateFormControl() {
    return this.profileUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileUpdateForm.invalid) {
      return;
    }
    this.loading = true;
  }

}
