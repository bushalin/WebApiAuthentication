import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, first } from 'rxjs/operators'
import { ReportService } from 'src/services/report.services';
import { Report } from 'src/models/report';

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
  styleUrls: ['./report-comment.component.css']
})
export class ReportCommentComponent implements OnInit {

  remarks;
  reportModel = new Report();
  reportId: string;
  reportList: any[] = [];
  report;
  constructor(private actRoute: ActivatedRoute,
    private reportService: ReportService) {
      this.actRoute.params.pipe(switchMap((params: Params) => this.reportService.getReportById(+params['id']))).subscribe(
        (data) => {
          this.report = data;
          this.reportModel.id = data.reportId;
          this.reportModel.UserId = data.userId;
          this.reportModel.ReportStatus = data.reportStatus;
          if(data.remarks !== null) {
            this.remarks = data.remarks;
          }
          console.log(this.report);
          console.log(this.reportModel);
        }
      );
   }

  ngOnInit() {
  }

  onSubmit() {
    this.reportModel.Remarks = this.remarks;
    
    this.reportService.UpdateRemarks(this.reportModel).subscribe(
      data => {
        console.log(data);
      },
      error => {}
    )
  }

}
