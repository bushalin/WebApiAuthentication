import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { map } from "rxjs/operators";
import { User } from "src/models/user";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class CommonService {
  userDataSubscription;
  userData = new User();
  httpOptions;
  header;
  headerToken;
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.userDataSubscription = this.authService.userData
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
    // this.headerToken = new HttpHeaders({
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    //   Authorization : "Bearer " + localStorage.getItem('authToken'),
    // });

    this.header = new HttpHeaders().set("Content-type", "application/json");
    this.header.set("Accept", "application/json");
  }

  roleMatch(allowedRoles: string[]): boolean {
    var isMatch = false;
    allowedRoles.forEach((element) => {
      if (this.userData.role.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~below code is for references~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Common Request Urls
  // Get List
  // Url: http://127.0.0.1:3000/company/

  // httpOptions Will be added for authentication put

  // Add List
  // Url: http://127.0.0.1:3000/company/
  /*{
    "name":  "Company Name",
    "email":  "Company@email.com",
    "tel":  "0000252525"
  }*/

  createList(url, params) {
    return this.http.post<any>(environment.apiUrl + url, params).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Update List (PUT Method)
  // Url: http://127.0.0.1:3000/company/1
  /*{
    "name":  "Company Name",
    "email":  "Company@email.com",
    "tel":  "0000252525"
  }*/

  updateList(url, params) {
    return this.http.put<any>(url, params).pipe(
      map((res) => {
        return res;
      })
    );
  }

  // Delete List (Patch Method)
  // Url: http://127.0.0.1:3000/company/1

  deleteList(url) {
    return this.http.delete<any>(url).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getList(url) {
    return this.http.get<any>(environment.apiUrl + url).pipe(
      map((res) => {
        return res;
      })
    );
  }

}
