import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { CommonService } from "src/services/common.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: "app-report-previledged-view",
  templateUrl: "./report-previledged-view.component.html",
  styleUrls: ["./report-previledged-view.component.css"]
})
export class ReportPreviledgedViewComponent implements OnInit {
  userId = "632922b2-5375-4aff-93a7-d552dca01a38";
  userName = "Imran";

  // longText =
  //   "Bacon ipsum dolor amet bacon t-bone tongue ball tip salami, flank capicola. Leberkas ribeye pork pork loin. Biltong porchetta picanha capicola tri-tip boudin. Tenderloin leberkas chicken, ham pig pork loin flank salami ham hock chuck meatball kevin. Meatloaf capicola landjaeger ground round ham hock ball tip boudin shank pork chop ribeye rump frankfurter turkey. Spare ribs short loin pork chop, biltong capicola shoulder pig drumstick pork porchetta brisket venison turducken sausage. Pig alcatra short loin jowl, prosciutto leberkas ham chuck.";

  reportList: any[] = [];
  selectedValue: string;
  selectedOption: any;
  userList:  any[] = [];
  // isFirstOpen = false;
  customClass = "customClass";
  // myVar: any = { more: true, less: true };

  text =
    "著ての時詳てり講民25況ヨテク回聞オイヲエ技外クヌ情海津イしラさ申式原ぐらルわ知8権メルタ多情ぎぼッ全4三戸ツハヒラ員路吾暖ずん。選長スやを世画トすぐそ青受ッつぜ稿合し賞複おせ江株ばさ形宝ろゃや別権セラエサ着続さょ者投容イべぼ年聞ト査受そ屈出ロホマエ経連ほ。3師ら来業況ウヒハ整暴事ヌ長保リコ化真つえよ環童メシウ士本ヨヤヱ場戦活ハユ行盛ユウ険国もドるて。";

  constructor(
    private route: Router,
    private reportService: ReportService,
    private commonService: CommonService,
    private http: HttpClient
  ) {
    this.getReportListByUserId();
    // this.getAllUsers();

  }

  ngOnInit() {
    console.log(this.reportList);
    // console.log(this.userList);
  }

  getReportListByUserId() {
    this.reportService.getReportById(this.userId).subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });

        // data.foreach(element => {
        //   this.reportList.push({
        //     firstName : element.FirstName,
        //     lastName: element.lastName
        //   })
        // })
        //this.reportList = JSON.parse(JSON.stringify(data));
        //this.reportList = data.value;
      },
      err => {}
    );
  }

  // getAllUsers() {
  //   this.commonService.getAllUsers().subscribe(
  //     data => {
  //       Object.entries(data).map(res => {
  //         this.userList.push(res[1]);
  //       });
  //     },
  //     err => {}
  //   );
  // }


  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
  }
}
