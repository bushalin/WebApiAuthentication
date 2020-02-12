import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportCreateComponent } from './report/report-create/report-create.component';
import { ReportUserViewComponent } from './report/report-user-view/report-user-view.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ReportCheckComponent } from './report/report-check/report-check.component';


const routes: Routes = [
  
  { path: '', redirectTo: '/viewreport', pathMatch: 'full' },
  { path: 'create', component: ReportCreateComponent },
  { path: 'viewreport', component: ReportUserViewComponent },
  { path: 'checkreport', component: ReportCheckComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
