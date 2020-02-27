import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserRole } from 'src/models/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  userDataSubscription: any;
  userData = new User();
  userName = '';
  constructor(private authService: AuthenticationService, private route: Router) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      this.userName = this.userData.fullName;
    })
   }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
