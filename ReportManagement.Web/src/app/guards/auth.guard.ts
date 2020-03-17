import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/models/user";
import { AuthenticationService } from "src/services/authentication.service";
import { UserRole } from "src/models/roles";
import { isDefined } from '@angular/compiler/src/util';
import { isUndefined } from 'util';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  userDataSubscription: any;
  userData = new User();
  guardFlag = false;
  userRoles: any[] = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.userDataSubscription = this.authService.userData
      .asObservable()
      .subscribe(data => {
        this.userData = data;
      });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (!isUndefined(this.userData.role)) {
    //   this.userData.role.forEach(element => {
    //     if (element === UserRole.Admin) {
    //       this.guardFlag = true;
    //     }
    //   });

    //   if (this.guardFlag === true) {
    //     return true;
    //   }
    // }

    if(this.userService.roleMatch(['User', 'Admin'])) {
      return true;
    }

    this.router.navigate(["/landing-page"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
