import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css']
})
export class RoleDeleteComponent implements OnInit {

  loading = false;
  roleDeleteForm: FormGroup;
  submitted = false;
  roleList:  any[] = [];
  roleData: any = {};

  modalRef: BsModalRef;
  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-xl"
  };

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private roleService: RoleService,
    private modalService: BsModalService,
    private router: Router,
  ) {
    this.getAllRoles();
   }

  ngOnInit() {
    this.roleDeleteForm = this.formBuilder.group({
      roleId: ['', Validators.required]
    });
  }

  get roleDeleteFormControl() {
    return this.roleDeleteForm.controls;
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

  onSubmit(template: TemplateRef<any>){
    this.submitted = true;
    if (this.roleDeleteForm.invalid) {
      return;
    }
    this.loading = true;
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  modalConfirm() {
    this.modalRef.hide();
    
    this.roleData.id = this.roleDeleteForm.controls['roleId'].value;

    //this.router.navigate(["/report"]);
    console.log(this.roleData);
  }

  modalDecline() {
    this.submitted = false;
    if (this.roleDeleteForm.invalid) {
      return;
    }
    this.loading = false;

    this.modalRef.hide();
  }
}
