import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.css']
})
export class RoleCreationComponent implements OnInit {

  loading = false;
  roleCreateForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.roleCreateForm = this.formBuilder.group({
      roleCreate: ['', Validators.required]
    });
  }

  get roleCreateFormControl() {
    return this.roleCreateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.roleCreateForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.roleCreateForm.controls['roleCreate'].value);
  }

}
