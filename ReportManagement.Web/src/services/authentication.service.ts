import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData = new BehaviorSubject<User>(new User());
  userAdditionalDetail: any;

  header;

  constructor(private http: HttpClient, private router: Router) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
   }

  login(userDetails) {

    let urlSearchParams = new URLSearchParams();
    for (let key in userDetails) {
      urlSearchParams.set(key, userDetails[key]);
    }

    let body = urlSearchParams.toString();

    return this.http.post<any>(environment.apiUrl + 'login', body, { headers: this.header })
      .pipe(map(response => {
        localStorage.setItem('authToken', response['access_token']);
        this.setUserDetails();
        return response;
      }));
  }

  setUserDetails() {
    if(localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));
      userDetails.userId = decodeUserDetails['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      userDetails.role = decodeUserDetails['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      userDetails.fullName = decodeUserDetails['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
      //console.log(userDetails);


      console.log(userDetails);
      this.userData.next(userDetails);
    }
  }

  getUserAdditionalDetail(id) {
    return this.http
      .get<any>(environment.apiUrl + `user/GetUserDetailById/` + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}
