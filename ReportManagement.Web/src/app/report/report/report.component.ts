import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private translate: TranslateService) {
    // let userLanguage;
    // userLanguage = navigator.language;

    // if(userLanguage === "en-US") {
    //   userLanguage = "en"
    // }
    // if(userLanguage === "ja") {
    //   userLanguage = "jp"
    // }
    // translate.use(userLanguage);
   }

  ngOnInit() {

  }

}
