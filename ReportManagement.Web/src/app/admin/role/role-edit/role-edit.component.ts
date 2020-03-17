import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.services';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  loading = false;
  roleEditForm: FormGroup;
  submitted = false;
  roleList:  any[] = [];
  roleData: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
  ) {
    this.getAllRoles();
   }

  ngOnInit() {
    this.roleEditForm = this.formBuilder.group({
      roleId: ['', Validators.required],
      newRoleName: ['', Validators.required],
    });
  }

  get roleEditFormControl() {
    return this.roleEditForm.controls;
  }

  getAllRoles() {
    this.commonService.getAllRoles().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.roleList.push(res[1]);
        });
      },
      err => {}
    );
  }

  onSubmit(){
    this.submitted = true;
    if (this.roleEditForm.invalid) {
      return;
    }
    this.loading = true;
    this.roleData.id = this.roleEditForm.controls['roleId'].value;
    this.roleData.name = this.roleEditForm.controls['newRoleName'].value;
    console.log(this.roleData);
  }

}
