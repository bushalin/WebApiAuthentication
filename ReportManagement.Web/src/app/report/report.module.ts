import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportUserViewComponent } from './report-user-view/report-user-view.component';
import { ReportService } from 'src/services/report.services';
import { TopBarComponent } from '../layout/top-bar/top-bar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { ReportPreviledgedViewComponent } from './report-previledged-view/report-previledged-view.component';
import { ReportCheckComponent } from './report-check/report-check.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [ReportCreateComponent, ReportUserViewComponent, TopBarComponent, SidebarComponent, ReportPreviledgedViewComponent, ReportCheckComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ReportCreateComponent],
  providers: [ReportService]
})
export class ReportModule { }
