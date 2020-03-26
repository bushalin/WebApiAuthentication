import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcastMessageCreateComponent } from './broadcast-message-create/broadcast-message-create.component';
import { BroadcastMessageShowComponent } from './broadcast-message-show/broadcast-message-show.component';



@NgModule({
  declarations: [BroadcastMessageCreateComponent, BroadcastMessageShowComponent],
  imports: [
    CommonModule
  ]
})
export class BroadcastMessageModule { }
