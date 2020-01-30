import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportCreateComponent } from './report-create/report-create.component';



@NgModule({
  declarations: [ReportCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ReportCreateComponent]
})
export class ReportModule { }
