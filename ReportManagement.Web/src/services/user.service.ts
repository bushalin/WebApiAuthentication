import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from './authentication.service';
import { User, UserProfileEdit } from 'src/models/user';

@Injectable({
  providedIn: "root"
})
export class UserService {
  header;
  userDataSubscription;
  userData = new User();

  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      //console.log(this.userData);
    });

    this.header = new HttpHeaders()
    .set('Content-type', 'application/json');
    this.header.set('Accept', 'application/json');
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

  // Fetch all employee data
  getAllUsers() {
    return this.http.get<any>(environment.apiUrl + `user/getallUserInfo`).pipe(
      map(res => {
        return res;
      })
    );
  }


  getUserDetailsById(userId) {
    return this.http.get<any>(environment.apiUrl + `accounts/user/` + userId , {headers: this.header})
    .pipe(
      map(res => {
        return res;
      })
    );
  }

  getUserInfoById(id) {
    return this.http.get<any>(environment.apiUrl + `user/GetUserDetailById/` + id)
    .pipe(
      map(res => {
        return res;
      })
    );
  }

  updateProfile(userProfile) {
    return this.http.put<UserProfileEdit>(environment.apiUrl + `user/UpdateUserProfile`, userProfile, {headers: this.header})
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
