import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileCreateComponent } from "./user-profile-create/user-profile-create.component";
import { UserProfileEditComponent } from "./user-profile-edit/user-profile-edit.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserListComponent } from "./user-list/user-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";
import { ReportModule } from "../report/report.module";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { UserChangePasswordComponent } from "./user-change-password/user-change-password.component";
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { TopBarComponent } from "../layout/top-bar/top-bar.component";


@NgModule({
  declarations: [
    // TopBarComponent,
    UserProfileComponent,
    UserProfileCreateComponent,
    UserProfileEditComponent,
    UserRegistrationComponent,
    UserListComponent,
    UserComponent,
    UserChangePasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReportModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService]
})
export class UserModule {}
