import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ReportService } from "src/services/report.services";
import { element } from "protractor";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: "app-report-user-view",
  templateUrl: "./report-user-view.component.html",
  styleUrls: ["./report-user-view.component.css"]
})
export class ReportUserViewComponent implements OnInit {
  userId;
  userName;

  pageNumber: number = 1;
  // TODO: use totalRec for server side pagination
  //totalRec: number;

  userDataSubscription;
  userData;

  customClass = "customClass";
  isFirstOpen = false;

  // list for showing the form data
  reportList: any[] = [];

  mySubscription: any;

  constructor(
    private route: Router,
    private reportService: ReportService,
    private authService: AuthenticationService,
    public userService: UserService,
    private http: HttpClient,
    //Spinner effect implemented. spinner will work while data is being loaded from server
    // resource: https://www.c-sharpcorner.com/article/how-to-add-loaderspinner-in-angular-8-application/
    private SpinnerService: NgxSpinnerService
  ) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      //This will come from the seperate api call of login function. not from token
      this.userName = this.userData.fullName;
      this.userId = this.userData.userId;
    })

    // FOR RELOADING THE SPECIFIC PAGE 
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.route.navigated = false;
      }
    });

  }

  ngOnInit() {
    if(this.userService.roleMatch(['Shacho'])) {
      this.route.navigate(['/report/show']);
    }

    
    this.getReportListByUserId();
    console.log(this.reportList);
  }

  getReportListByUserId() {
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.reportService.getReportByUserId(this.userId).subscribe(
      data => {
        Object.entries(data).map(res => {
          this.reportList.push(res[1]);
        });
        //after fetching data, spinner will hide
        this.SpinnerService.hide();
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
}
