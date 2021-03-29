import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GetResponseBook } from '@interfaces/get-response-book';
import { environment } from '@environments/environment';
import { ProcessErrorService } from '@services/process-error.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private processErrorService: ProcessErrorService
  ) {}

  searchByKeyword(term: string): Observable<GetResponseBook[]> {
    from(this.router.navigateByUrl(`/search/${term}`));
    const search = `${this.searchUrl}/books/search/searchByKeyword?name=${term}`;
    if (term === '') {
      return of([]);
    }
    return this.httpClient
      .get<GetResponseBook[]>(search)
      .pipe(catchError(this.processErrorService.processError));
  }
}
