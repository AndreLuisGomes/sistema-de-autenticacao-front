import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean | UrlTree => {
  console.log("atrapalhando");
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!!authService.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/auth', 'fazer-login'])
}
