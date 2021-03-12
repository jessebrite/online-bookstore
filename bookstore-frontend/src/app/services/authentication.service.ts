import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProcessErrorService } from '@services/process-error.service';
import { BROWSER_STORAGE } from '@common/storage';
import { AuthResponse } from '@common/auth-response';
import { User } from '@common/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = `${environment.apiBaseUrl}/auth/`;
  user = new User();
  USER_TOKEN = 'loc8r-token';

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private httpClient: HttpClient,
    private processErrorService: ProcessErrorService,
  ) {}

  public processAuthentication(user: User, url?: string): Observable<User> {
    console.log('user: ', user);
    return this.httpClient
      .post<User>(this.url + url, user, {
        headers: this.headers,
      })
      .pipe(
        tap((results: User) => console.log('results: ', results)),
        map((authResponse: AuthResponse) => this.saveToken(authResponse.token)),
        catchError(this.processErrorService.processError)
      );
  }

  public getToken(): string {
    return this.storage.getItem(this.USER_TOKEN) || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem(this.USER_TOKEN, token);
  }

  public logout(): void {
    this.storage.removeItem('loc8r-token');
  }

  public isloggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getcurrentuser(): User {
    if (!this.isloggedIn) {
      return this.user;
    }
    const token: string = this.getToken();
    const { email, username } = JSON.parse(atob(token.split('.')[1]));
    return { email, username } as User;
  }
}
