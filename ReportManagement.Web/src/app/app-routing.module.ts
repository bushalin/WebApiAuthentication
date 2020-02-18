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


const routes: Routes = [
  
  { path: '', redirectTo: '/view-report', pathMatch: 'full' },
  { path: 'create-report', component: ReportCreateComponent },
  { path: 'view-report', component: ReportUserViewComponent },
  { path: 'check-report', component: ReportCheckComponent },
  { path: 'view-previledged-report', component: ReportPreviledgedViewComponent },
  { path: 'create-comment', component: ReportCommentComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile-create', component: UserProfileCreateComponent },
  { path: 'profile-edit', component: UserProfileEditComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
