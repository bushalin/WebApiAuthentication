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
import { isUndefined } from 'util';

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  userDataSubscription: any;
  userData = new User();
  guardFlag = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
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
      
      if(!isUndefined(this.userData.role)) {
        this.userData.role.forEach(element => {
          if (element === UserRole.Admin) {
            this.guardFlag = true;
          }
        });
        if(this.guardFlag === true) { return true };
      }

    this.router.navigate(["/landing-page"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
