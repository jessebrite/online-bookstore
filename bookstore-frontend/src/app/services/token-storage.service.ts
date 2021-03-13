import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public getToken(): string {
    return window.sessionStorage.getItem(USER_KEY) || '';
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public logout(): void {
    window.sessionStorage.removeItem(USER_KEY);
  }

  public isloggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  public getCurrentUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
