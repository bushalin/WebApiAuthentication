import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { CommonService } from 'src/services/common.services';

@Injectable({
  providedIn: 'root'
})
export class ShachoGuard implements CanActivate {
  userDataSubscription: any;
  userData = new User();
  guardFlag = false;
  userRoles: any[] = [];

  constructor(private router: Router,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private userService: UserService) {
      this.userDataSubscription = this.authService.userData
      .asObservable()
      .subscribe(data => {
        this.userData = data;
      });
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // if (!isUndefined(this.userData.role)) {
      //   this.userData.role.forEach(element => {
      //     if (element === UserRole.Admin || element === UserRole.Shacho) {
      //       this.guardFlag = true;
      //     }
      //   });
  
      //   if (this.guardFlag === true) {
      //     return true;
      //   }
      // }

      if(this.commonService.roleMatch(['Shacho', 'Admin'])) {
        return true;
      }
  
      this.router.navigate(["/landing-page"], { queryParams: { returnUrl: state.url } });
      return false;
  }
  
}
