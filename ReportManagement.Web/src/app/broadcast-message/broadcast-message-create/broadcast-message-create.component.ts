import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BroadcastMessageCreateModel } from 'src/models/broadcastMessage';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-broadcast-message-create',
  templateUrl: './broadcast-message-create.component.html',
  styleUrls: ['./broadcast-message-create.component.css']
})
export class BroadcastMessageCreateComponent implements OnInit {

  messageCreateForm: FormGroup;
  submitted = false;
  userDataSubscription;
  userData;
  messageFormData: any = {};

  // ngx-modal configuration and implementation
  modalRef: BsModalRef;
  modalConfig = {
    backdrop: true,
    class: "modal-xl"
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: BsModalService,
  ) {
    // getting user data
    this.userDataSubscription = this.authService.userData
      .asObservable()
      .subscribe(data => {
        this.userData = data;
      });
   }

  ngOnInit() {
    this.messageCreateForm = this.formBuilder.group({
      messageTitle: ["", Validators.required],
      messageBody: ["", Validators.required],
    });
  }

  get messageCreateFormControl() {
    return this.messageCreateForm.controls;
  }

  onSubmit(template: TemplateRef<any>) {
    this.submitted = true;
    if (this.messageCreateForm.invalid) {
      return;
    }
    let messageModel = new BroadcastMessageCreateModel();
    this.messageFormData.messageTitle = this.messageCreateForm.controls["messageTitle"].value;
    this.messageFormData.messageBody = this.messageCreateForm.controls["messageBody"].value;
    messageModel.UserId = this.userData.userId;
    messageModel.MessageTitle = this.messageCreateForm.controls["messageTitle"].value;
    messageModel.MessageBody = this.messageCreateForm.controls["messageBody"].value;
    this.modalRef = this.modalService.show(template, this.modalConfig);
    console.log(this.messageFormData);
    
  }

  modalConfirm() {
    // calling api to save data
    // this.reportService.saveReport(this.reportFormData).subscribe(
    //   data => {
    //     console.log(data);
        
    //   },
    //   error => {
        
    //   }
    // );
    console.log(this.messageFormData);
    this.modalRef.hide();

    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/broadcast"]);
    });
  }

  modalDecline() {
    this.submitted = false;
    if (this.messageCreateForm.invalid) {
      return;
    }

    this.modalRef.hide();
  }

}
