import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportCreateComponent } from './report/report-create/report-create.component';
import { ReportUserViewComponent } from './report/report-user-view/report-user-view.component';


const routes: Routes = [
  {path: '', component: ReportUserViewComponent},
  {path: 'create', component: ReportCreateComponent},
  {path: 'viewreport', component: ReportUserViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
