import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient,
    private router: Router) { }
  
  login(userDetails) {
    return this.http.post<any>('/api/login', userDetails)
      .pipe(map(response => {
        localStorage.setItem('authenticationToken', response.token);
        this.setUserDetails();
        return response;
      }));
  }

  setUserDetails(){
    if(localStorage.getItem('authenticationToken')){
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authenticationToken').split('.')[1]));

      userDetails.userName = decodeUserDetails.sub;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.role = decodeUserDetails.role;

      this.userData.next(userDetails);
    }
  }

  logout(){
    localStorage.removeItem('authenticationToken');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}
