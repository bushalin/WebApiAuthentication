import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileCreateComponent } from './user-profile-create/user-profile-create.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ReportModule } from '../report/report.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileCreateComponent,
    UserProfileEditComponent,
    UserRegistrationComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReportModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule
  ]
})
export class UserModule { }
