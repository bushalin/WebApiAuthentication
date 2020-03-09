import { Component, OnInit } from '@angular/core';
import { CommonService } from "src/services/common.services";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  userList:  any[] = [];

  constructor(
    private commonService: CommonService
  ) {
    this.getAllUsers();
   }

  ngOnInit() {
  }

  getAllUsers() {
    this.commonService.getAllUsers().subscribe(
      data => {
        Object.entries(data).map(res => {
          this.userList.push(res[1]);
        });
      },
      err => {}
    );

    console.log(this.userList);
  }

}
