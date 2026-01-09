import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CommonUXService } from './services/common-ux.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private commonService: CommonUXService
  ) { }

  canActivate(): boolean | UrlTree {
    return this.authService.currentUser()?.role === 'owner'
      ? true
      : this.router.createUrlTree(['/auth/fazer-login'])
  };

  // registerOptions(): {
  //   if (this.router.getCurrentNavigation.toString().match('/fazer-login')){
  //     this.commonService.registerOptions();
  //   }
  // }
}