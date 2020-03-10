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

const reportRoutes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {path: '', component: ReportUserViewComponent},
      {path: 'create', component: ReportCreateComponent},
      {path: 'check', component: ReportCheckComponent},
      {
        path: 'show',
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
    RouterModule.forChild(reportRoutes)
  ],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
