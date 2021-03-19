import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { Role } from '@common/role.enum';

const TOKEN_KEY = environment.token_key;
const USER_KEY = environment.user_key;

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private router: Router) {}

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public logout(): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear(); // just to be sure
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    return token ? true : false;
  }

  public getCurrentUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isAdmin(): any {
    return this.isLoggedIn() && this.getCurrentUser().roles === Role.ADMIN;
  }
}
