import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  userDataSubscription: any;
  userData = new User();

  constructor(private authService: AuthenticationService,
    private route: Router) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  ngOnInit() {
    if(this.userData.isLoggedIn ===true) {
      this.route.navigate(['/report']);
    }
  }

}
