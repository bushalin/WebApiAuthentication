import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/services/common.services';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDataSubscription;
  userData = new User();
  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthenticationService) {
      this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
        this.userData = data;
      });
     }

  ngOnInit() {
  }

}
