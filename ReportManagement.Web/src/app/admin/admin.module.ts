import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RoleCreationComponent } from './role/role-creation/role-creation.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleDeleteComponent } from './role/role-delete/role-delete.component';
import { RoleAssignComponent } from './role/role-assign/role-assign.component';
import { SetDefaultPasswordComponent } from './set-default-password/set-default-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



@NgModule({
  declarations: [
    AdminComponent, 
    AdminHomeComponent, 
    RoleCreationComponent, 
    RoleEditComponent, 
    RoleDeleteComponent, 
    RoleAssignComponent, 
    SetDefaultPasswordComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService]
})
export class AdminModule { }
