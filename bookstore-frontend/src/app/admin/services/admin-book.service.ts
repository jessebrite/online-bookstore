import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '@common/book';
import { GetResponseBook } from '@interfaces/get-response-book';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminBookService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getBooks(
    currentPage: number,
    pageSize: number
  ): Observable<GetResponseBook> {
    const params: string = [`page=${currentPage}`, `size=${pageSize}`].join(
      '&'
    );
    const bookUrl = `${this.apiBaseUrl}/books?${params}`;
    return this.httpClient.get<GetResponseBook>(bookUrl);
  }
}
