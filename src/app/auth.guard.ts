import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    return this.authService.isLoggedIn()
      ? true
      : this.router.createUrlTree(['/auth/fazer-login'])
  };
}

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
