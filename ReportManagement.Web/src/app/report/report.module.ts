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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { AccordionModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgaReadMoreModule } from 'nga-read-more';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ReportSearchNameComponent } from './report-search-name/report-search-name.component';
import { ReportSearchDateComponent } from './report-search-date/report-search-date.component';



@NgModule({
  declarations: [ReportCreateComponent, ReportUserViewComponent, TopBarComponent, SidebarComponent, ReportPreviledgedViewComponent, ReportCheckComponent, ReportCommentComponent, ReportSearchNameComponent, ReportSearchDateComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    NgaReadMoreModule,
    TypeaheadModule.forRoot(),
  ],
  exports: [ReportCreateComponent, TopBarComponent],
  providers: [ReportService]
})
export class ReportModule { }
