import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  header;
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set("Content-Type", "application/json");
    this.header.set("Accept", "application/json");
  }

  getAllRoles() {
    return this.http
      .get<any>(environment.apiUrl + `roles`, { headers: this.header })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  createRole() {
    return this.http
      .get<any>(environment.apiUrl + `roles/create`, { headers: this.header })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  assignRoletoUser(roleModel) {
    return this.http
      .put<any>(
        environment.apiUrl + `accounts/user/AssignRolesToUser`,
        roleModel,
        { headers: this.header, withCredentials: true }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
