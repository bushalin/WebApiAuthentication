import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfileEdit, ChangePassword } from 'src/models/user';
import { UserCreate } from 'src/models/user';

@Injectable()
export class CommonService {
  httpOptions;
  header;
  headerToken;
  constructor(private http: HttpClient) {
    this.headerToken = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization : "Bearer " + localStorage.getItem('authToken'),
    });

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }),
      withCredentials: true,
    };
    
    this.header = new HttpHeaders()
    .set('Content-type', 'application/json');
    this.header.set('Accept', 'application/json');
  }

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
      map(res => {
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
      map(res => {
        return res;
      })
    );
  }

  // Delete List (Patch Method)
  // Url: http://127.0.0.1:3000/company/1

  deleteList(url) {
    return this.http.delete<any>(url).pipe(
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

  getAllRoles() {
    return this.http.get<any>(environment.apiUrl + `roles`, {headers: this.header}).pipe(
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

  
  assignRoletoUser(roleModel) {
    return this.http.put<any>(environment.apiUrl + `accounts/user/AssignRolesToUser`, roleModel, {headers: this.header, withCredentials: true})
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  //fetching REPORT data
  getReports() {
    return this.http.get<any>(environment.apiUrl + `user/getallUserInfo`).pipe(
      map(res => {
        return res;
      })
    );
  }


  getList(url) {
    return this.http.get<any>(environment.apiUrl + url).pipe(
      map(res => {
        return res;
      })
    );
  }

  userRegistration(userData) {
    return this.http.post<UserCreate>(environment.apiUrl + `accounts/create`, JSON.stringify(userData), {headers: this.header})
    .pipe(
      map(res => {
        return res;
      })
    )
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

  changePassword(changePasswordModel) {
    return this.http.post<ChangePassword>(environment.apiUrl + `accounts/ChangePassword`, changePasswordModel, {headers: this.header})
    .pipe(
      map(res => {
        return res;
      })
    );
  }

}
