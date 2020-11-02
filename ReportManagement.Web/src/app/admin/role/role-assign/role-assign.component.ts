import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { RoleService } from 'src/services/role.service';
import { AssignUserToRolesModel } from 'src/models/roles';

@Component({
  selector: "app-role-assign",
  templateUrl: "./role-assign.component.html",
  styleUrls: ["./role-assign.component.css"]
})
export class RoleAssignComponent implements OnInit {
  submitted = false;
  roleAssignForm: FormGroup;
  employeeId: string;
  roleData = [];
  userList: any[] = [];
  roleList: any[] = [];
  public roleDataForm: FormArray;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {
    this.getAllUsers();
    this.getAllRoles();
  }

  ngOnInit() {
    console.log(this.userList);
    console.log(this.roleList);
    this.roleAssignForm = this.formBuilder.group({
      employeeNameSelectedValue: ["", Validators.required],
      roleSelectedValue: this.formBuilder.array([])
    });

    this.roleDataForm = this.roleAssignForm.get(
      "roleSelectedValue"
    ) as FormArray;
  }

  onOptionsSelected(value: string) {
    while (this.roleDataForm.length !== 0) {
      this.roleDataForm.removeAt(0);
    }

    if (value) {
      this.submitted = true;
    }
    this.employeeId = value;
    this.roleData = [];

    this.userService.getUserDetailsById(this.employeeId).subscribe(
      data => {
        Object.entries(data.roles).map(res => {
          this.roleData.push(res[1]);
          this.roleDataForm.push(new FormControl(res[1]));
        });
      },
      err => {}
    );
    console.log(this.roleData);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.userList.push(res[1]);
        });
      },
      err => {}
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
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
          const index = this.roleData.indexOf(item.value);
          if (index > -1) {
            this.roleData.splice(index, 1);
          }

          //this.roleData.splice(this.roleDataForm.controls.indexOf(item, 1));
          return;
        }
        i++;
      });
    }
  }

  onSubmit(){
    // this.roleData = this.roleDataForm.value;
    
    if (this.roleAssignForm.invalid) {
      return;
    }
    this.roleData = this.roleData.concat(this.roleDataForm.value);
    this.roleData = this.roleData.filter((item,index) => this.roleData.indexOf(item) === index);


    console.log(this.roleData);

    let assignModel = new AssignUserToRolesModel();
    assignModel.UserId = this.employeeId;
    this.roleData.forEach(element => {
      assignModel.RolesToAssign.push(element);
    })

    this.roleService.assignRoletoUser(assignModel).subscribe(
      data => {
        console.log(data);
      },
      error => {
      }
    );

  }
}
