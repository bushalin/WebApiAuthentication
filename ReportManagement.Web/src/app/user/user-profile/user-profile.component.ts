import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/services/common.services';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  mySubscription
  userDataSubscription;
  userData = new User();

  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private authService: AuthenticationService) {
      this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
        this.userData = data;
      });
     }

  ngOnInit() {
    // FOR RELOADING THE SPECIFIC PAGE 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  //TODO: User information have to be called by another service other than authservice; page refresh is must

}
