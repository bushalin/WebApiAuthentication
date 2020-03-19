import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-report-check',
  templateUrl: './report-check.component.html',
  styleUrls: ['./report-check.component.css']
})
export class ReportCheckComponent implements OnInit {

  bsValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';

  name = ['Hasib', 'Imran','Ichinose'];


  collectedDate;
  transFormedDate;
  days = [];
  showDates = [];
  test = ["2020-06-01","2020-06-02", "2020-06-25", "2020-06-29"];
  
 
  bsConfig: Partial<BsDatepickerConfig>;

   date = new Date(2020, 6, 1);
  //  date = new Date(Number(this.datePipe.transform(this.collectedDate, 'yyyy')), Number(this.datePipe.transform(this.collectedDate, 'MM')) - 1, 1);
   
  constructor(
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode
    });
  //  this.days = this.getDaysInMonth(0, 2020);
   console.log(this.days);
  }

   getDaysInMonth(month, year) {
         
    while (this.date.getMonth() === month) {
      this.days.push(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
      this.date.setDate(this.date.getDate() + 1);
    }
    return this.days;
  }

  onPressed(){
    //console.log(this.date);
    this.date = new Date(Number(this.datePipe.transform(this.collectedDate, 'yyyy')), Number(this.datePipe.transform(this.collectedDate, 'MM')), 1);
    let month = Number(this.datePipe.transform(this.collectedDate, 'MM'));
    let year = Number(this.datePipe.transform(this.collectedDate, 'yyyy'));
    console.log(month);
    console.log(year);
    this.showDates = this.getDaysInMonth(month, year);
    this.transFormedDate = this.datePipe.transform(this.collectedDate, 'yyyy-MM-dd');
    console.log(this.days);
    console.log(this.transFormedDate);
    this.days = [];
  }
}
