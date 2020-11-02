import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserCreate} from "src/models/user";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { ChangePassword } from 'src/models/common';

@Injectable({
  providedIn: "root",
})
export class AccountService {
  header;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set("Content-Type", "application/json");
    this.header.set("Accept", "application/json");
  }

  userRegistration(userData) {
    return this.http
      .post<UserCreate>(
        environment.apiUrl + `accounts/create`,
        JSON.stringify(userData),
        { headers: this.header }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  changePassword(changePasswordModel) {
    return this.http
      .post<ChangePassword>(
        environment.apiUrl + `accounts/ChangePassword`,
        changePasswordModel,
        { headers: this.header }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  resetPassword(resetPasswordModel) {
    return this.http
      .post<any>(
        environment.apiUrl + `accounts/ResetPassword`,
        resetPasswordModel,
        { headers: this.header, withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
