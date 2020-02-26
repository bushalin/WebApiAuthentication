import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reportmanagement-web';
  constructor(private authService: AuthenticationService) {
    if(localStorage.getItem('authToken')) {
      this.authService.setUserDetails();
    }
  }
}
