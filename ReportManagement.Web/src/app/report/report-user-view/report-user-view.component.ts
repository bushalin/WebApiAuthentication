import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-report-user-view",
  templateUrl: "./report-user-view.component.html",
  styleUrls: ["./report-user-view.component.css"]
})
export class ReportUserViewComponent implements OnInit {
  userId = "632922b2-5375-4aff-93a7-d552dca01a38"; // NOTICE: should change the method of setting the user information.
  userName = "Imran"; // user information will be set using login service.
  githubData: any;

  customClass = "customClass";
  isFirstOpen = false;

  // list for showing the form data
  reportList: any[] = [];
  testList = [];
  test_oneList: any;
  text =
    "著ての時詳てり講民25況ヨテク回聞オイヲエ技外クヌ情海津イしラさ申式原ぐらルわ知8権メルタ多情ぎぼッ全4三戸ツハヒラ員路吾暖ずん。選長スやを世画トすぐそ青受ッつぜ稿合し賞複おせ江株ばさ形宝ろゃや別権セラエサ着続さょ者投容イべぼ年聞ト査受そ屈出ロホマエ経連ほ。3師ら来業況ウヒハ整暴事ヌ長保リコ化真つえよ環童メシウ士本ヨヤヱ場戦活ハユ行盛ユウ険国もドるて。";


  constructor(
    private route: Router,
    private reportService: ReportService,
    private http: HttpClient
  ) {
    this.getReportListByUserId();
  }

  ngOnInit() {
    console.log(this.reportList);
    //this.getAllReportList();
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

  getAllReportList() {
    this.reportService.getAllReports().subscribe(
      data => {
        this.test_oneList = data;
      },
      err => {}
    );
  }

  // getTestData() {
  //   this.reportService.getTestData().subscribe(
  //     data => {
  //       data.forEach(element => {
  //         this.test_oneList.push({
  //           Id: element.Id,
  //           Name: element.Name,
  //           Description: element.Description
  //         })
  //       });
  //     }
  //   );
  // }
}
