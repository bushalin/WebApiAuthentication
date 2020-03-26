import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RoleCreationComponent } from './role/role-creation/role-creation.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleDeleteComponent } from './role/role-delete/role-delete.component';
import { RoleAssignComponent } from './role/role-assign/role-assign.component';
import { SetDefaultPasswordComponent } from './set-default-password/set-default-password.component';

const adminRoutes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      
      { path: "set-default-password", component: SetDefaultPasswordComponent, canActivate: [AdminGuard] },
      {
        path: "role",
        children: [
          { path: "create", component: RoleCreationComponent, canActivate: [AdminGuard] },
          { path: "edit", component: RoleEditComponent, canActivate: [AdminGuard] },
          { path: "delete", component: RoleDeleteComponent, canActivate: [AdminGuard] },
          { path: "assign", component: RoleAssignComponent, canActivate: [AdminGuard] }
        ]
      },
      { path: "", component: AdminHomeComponent, canActivate: [AdminGuard] },
      
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
