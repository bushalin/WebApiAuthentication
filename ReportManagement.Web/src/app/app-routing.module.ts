import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportCreateComponent } from './report/report-create/report-create.component';
import { ReportUserViewComponent } from './report/report-user-view/report-user-view.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ReportCheckComponent } from './report/report-check/report-check.component';
import { ReportPreviledgedViewComponent } from './report/report-previledged-view/report-previledged-view.component';
import { ReportCommentComponent } from './report/report-comment/report-comment.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserProfileCreateComponent } from './user/user-profile-create/user-profile-create.component';
import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ReportSearchComponent } from './report/report-search/report-search.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/view-report', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-report', component: ReportCreateComponent, canActivate: [AuthGuard] },
  { path: 'view-report', component: ReportUserViewComponent, canActivate: [AuthGuard]},
  { path: 'check-report', component: ReportCheckComponent, canActivate: [AuthGuard] },
  { path: 'view-privileged-report', component: ReportPreviledgedViewComponent, canActivate: [AdminGuard] },
  { path: 'create-comment/:id', component: ReportCommentComponent, canActivate: [AuthGuard] },
  { path: 'search-report', component: ReportSearchComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile-create', component: UserProfileCreateComponent, canActivate: [AuthGuard] },
  { path: 'profile-edit', component: UserProfileEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
