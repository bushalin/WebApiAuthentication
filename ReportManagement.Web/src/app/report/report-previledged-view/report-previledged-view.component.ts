import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.services';
import { Router } from '@angular/router';
import { ReportService } from 'src/services/report.services';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-report-previledged-view',
  templateUrl: './report-previledged-view.component.html',
  styleUrls: ['./report-previledged-view.component.css']
})
export class ReportPreviledgedViewComponent implements OnInit {

  reportList: any[] = [];

  constructor(private route: Router, private reportService: ReportService, private http: HttpClient) {
    this.getRecentReports();
    console.log(this.reportList);
   }

  ngOnInit() {
  }

  getRecentReports(){
    this.reportService.getRecentReports().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1])
        });
      }
    );
  }

  
}
