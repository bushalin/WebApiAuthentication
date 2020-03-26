import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.services';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-role-assign',
  templateUrl: './role-assign.component.html',
  styleUrls: ['./role-assign.component.css']
})
export class RoleAssignComponent implements OnInit {

  roleAssignForm: FormGroup;
  employeeId: string;
  roleData: any = {};
  userList:  any[] = [];
  roleList:  any[] = [];
  public roleDataForm: FormArray;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) {
    this.getAllUsers();
    this.getAllRoles();

   }

  ngOnInit() {
    console.log(this.userList);
    console.log(this.roleList);
    this.roleAssignForm = this.formBuilder.group({
      employeeNameSelectedValue: [''],
      roleSelectedValue: this.formBuilder.array([])
    });

    this.roleDataForm = this.roleAssignForm.get(
      "roleSelectedValue"
    ) as FormArray;
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

  onCheckboxChange(e) {
  
    if (e.target.checked) {
      this.roleDataForm.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.roleDataForm.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.roleDataForm.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit(){
    this.employeeId = this.roleAssignForm.controls['employeeNameSelectedValue'].value;
    this.roleData = this.roleDataForm.value;

    this.commonService.assignRole(this.roleData,this.employeeId).subscribe(
      data => {
        console.log(data);
      },
      error => {
      }
    );
    console.log(this.roleData);

    // TODO: error khay
  }

}
