import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BroadcastMessageCreateModel } from 'src/models/broadcastMessage';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-broadcast-message-create',
  templateUrl: './broadcast-message-create.component.html',
  styleUrls: ['./broadcast-message-create.component.css']
})
export class BroadcastMessageCreateComponent implements OnInit {

  messageCreateForm: FormGroup;
  loading = false;
  submitted = false;
  userDataSubscription;
  userData;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
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

  onSubmit() {
    this.submitted = true;
    if (this.messageCreateForm.invalid) {
      return;
    }
    let messageModel = new BroadcastMessageCreateModel();
    messageModel.UserId = this.userData.userId;
    messageModel.MessageTitle = this.messageCreateForm.controls["messageTitle"].value;
    messageModel.MessageBody = this.messageCreateForm.controls["messageBody"].value;
    this.loading = true;
    console.log(messageModel);
  }

}
