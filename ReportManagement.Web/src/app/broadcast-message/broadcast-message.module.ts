import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastMessageCreateComponent } from './broadcast-message-create/broadcast-message-create.component';
import { BroadcastMessageShowComponent } from './broadcast-message-show/broadcast-message-show.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { RouterModule } from '@angular/router';
import { BroadcastMessageRoutingModule } from './broadcast-message-routing.module';
import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ReportModule } from '../report/report.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgaReadMoreModule } from "nga-read-more";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BroadcastMessageCreateComponent, 
    BroadcastMessageShowComponent, 
    BroadcastMessageComponent
  ],
  imports: [
    CommonModule,
    ReportModule,
    RouterModule,
    BroadcastMessageRoutingModule,
    TranslateModule,
    NgxPaginationModule,
    NgaReadMoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService],
})
export class BroadcastMessageModule { }
