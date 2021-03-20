import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TokenStorageService } from '@services/token-storage.service';
import { environment } from '@environments/environment';

const USER_KEY = environment.user_key;

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.tokenService.getCurrentUser();
    if (user) {
      // navigate only if user has authorized role
      if (route.data?.roles.indexOf(user.roles) !== -1) {
        return true;
      }
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
