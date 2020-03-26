import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BroadcastMessageShowComponent } from './broadcast-message-show/broadcast-message-show.component';
import { BroadcastMessageCreateComponent } from './broadcast-message-create/broadcast-message-create.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';

const broadcastRoutes: Routes = [
  {
    path: "broadcast",
    component: BroadcastMessageComponent,
    children: [
      { path: "", component: BroadcastMessageShowComponent },
      { path: "create", component: BroadcastMessageCreateComponent },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(broadcastRoutes, { onSameUrlNavigation: 'reload' })
  ]
})
export class BroadcastMessageRoutingModule { }
