import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportCreateComponent } from "./report-create/report-create.component";
import { ReportUserViewComponent } from "./report-user-view/report-user-view.component";
import { ReportService } from "src/services/report.services";
import { TopBarComponent } from "../layout/top-bar/top-bar.component";
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { ReportPreviledgedViewComponent } from "./report-previledged-view/report-previledged-view.component";
import { ReportCheckComponent } from "./report-check/report-check.component";
import { AppRoutingModule } from "../app-routing.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReportCommentComponent } from "./report-comment/report-comment.component";
import { AccordionModule, ModalModule } from "ngx-bootstrap";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { NgaReadMoreModule } from "nga-read-more";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ReportSearchComponent } from './report-search/report-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReportComponent } from './report/report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportCreateComponent,
    ReportUserViewComponent,
    TopBarComponent,
    SidebarComponent,
    ReportPreviledgedViewComponent,
    ReportCheckComponent,
    ReportCommentComponent,
    ReportSearchComponent,
    ReportComponent
  ],
  imports: [
    ReportRoutingModule,
    TranslateModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    NgaReadMoreModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [ReportCreateComponent, TopBarComponent, TranslateModule],
  providers: [ReportService, DatePipe]
})
export class ReportModule {}
