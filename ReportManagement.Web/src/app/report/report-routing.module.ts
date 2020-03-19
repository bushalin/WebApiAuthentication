import { NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportUserViewComponent } from './report-user-view/report-user-view.component';
import { ReportCheckComponent } from './report-check/report-check.component';
import { ReportPreviledgedViewComponent } from './report-previledged-view/report-previledged-view.component';
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ShachoGuard } from '../guards/shacho.guard';

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {path: '', component: ReportUserViewComponent, canActivate: [AuthGuard],},
      {path: 'create', component: ReportCreateComponent, canActivate: [AuthGuard],},
      {path: 'check', component: ReportCheckComponent, canActivate: [AuthGuard],},
      {
        path: 'show',
        canActivate: [ShachoGuard],
        children: [
          { path: '', component: ReportPreviledgedViewComponent },
          { path: 'search', component: ReportSearchComponent},
          { path: ':id', component: ReportCommentComponent},
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(reportRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
