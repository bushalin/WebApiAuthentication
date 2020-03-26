import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastMessageCreateComponent } from './broadcast-message-create/broadcast-message-create.component';
import { BroadcastMessageShowComponent } from './broadcast-message-show/broadcast-message-show.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { RouterModule } from '@angular/router';
import { BroadcastMessageRoutingModule } from './broadcast-message-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    BroadcastMessageCreateComponent, 
    BroadcastMessageShowComponent, 
    BroadcastMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BroadcastMessageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerModule]
})
export class BroadcastMessageModule { }
