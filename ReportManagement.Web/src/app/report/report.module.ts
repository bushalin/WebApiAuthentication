import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportUserViewComponent } from './report-user-view/report-user-view.component';
import { ReportService } from 'src/services/report.services';
import { TopBarComponent } from '../layout/top-bar/top-bar.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';



@NgModule({
  declarations: [ReportCreateComponent, ReportUserViewComponent, TopBarComponent, SidebarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ReportCreateComponent],
  providers: [ReportService]
})
export class ReportModule { }
