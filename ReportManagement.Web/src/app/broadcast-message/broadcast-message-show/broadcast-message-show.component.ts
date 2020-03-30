import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { BroadcastMessageServiceService } from 'src/services/broadcast-message-service.service';

@Component({
  selector: "app-broadcast-message-show",
  templateUrl: "./broadcast-message-show.component.html",
  styleUrls: ["./broadcast-message-show.component.css"]
})
export class BroadcastMessageShowComponent implements OnInit {

  messageList = [];

  pageNumber: number = 1;
  constructor(
    public userService: UserService,
    private broadcastService: BroadcastMessageServiceService,
    private translate: TranslateService,
    private route: Router,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    if (this.userService.roleMatch(["Shacho"])) {
      //for redirection in the user role "show message"
      //this.route.navigate(["/report/show"]);
    }
    this.getRecentBroadcastMessage();
  }

  getRecentBroadcastMessage() {
    //before fetching data, spinner effect shows
    this.SpinnerService.show();
    this.broadcastService.getRecentBroadcastMessage().subscribe(data => {
      Object.entries(data).map(res => {
        this.messageList.push(res[1]);
      });
      //after fetching data, spinner will hide
      this.SpinnerService.hide();
      console.log(this.messageList);
    })
  }
}
