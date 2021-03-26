import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProcessErrorService } from '@services/process-error.service';
import { User } from '@common/user';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url = `${environment.apiBaseUrl}/auth/`;
  user = new User();

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private processErrorService: ProcessErrorService
  ) {}

  public processAuthentication(user: User, url?: string): Observable<User> {
		console.log('user: ', user);
    return this.httpClient
      .post<User>(this.url + url, user, {
        headers: this.headers,
      })
      .pipe(
        tap((results: User) => {
          // captured results and do nothing. There're side effects
          this.user = results;
        }),
        catchError(this.processErrorService.processError)
      );
  }
}
