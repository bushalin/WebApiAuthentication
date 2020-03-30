import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from './authentication.service';
import { User, ChangePassword } from 'src/models/user';

@Injectable({
  providedIn: "root"
})
export class UserService {
  userDataSubscription;
  userData = new User();

  constructor(private http: HttpClient,
    private authService: AuthenticationService) {
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
      //console.log(this.userData);
    });
  }

  roleMatch(allowedRoles: string[]): boolean {
    var isMatch = false;
    allowedRoles.forEach(element => {
      if(this.userData.role.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
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
}
