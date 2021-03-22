import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '@common/book';
import { GetResponseBook } from '@interfaces/get-response-book';
import { ProcessErrorService } from '@services/process-error.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminBookService {
  apiBaseUrl = `${environment.apiBaseUrl}/books`;

  headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Accept', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private processErrorService: ProcessErrorService
  ) {}

  public getBooks(
    currentPage: number,
    pageSize: number
  ): Observable<GetResponseBook> {
    const params: string = [`page=${currentPage}`, `size=${pageSize}`].join(
      '&'
    );
    const bookUrl = `${this.apiBaseUrl}?${params}`;
    return this.httpClient.get<GetResponseBook>(bookUrl);
  }

  public getSingleBook(id: number): Observable<Book> {
    const bookUrl = `${this.apiBaseUrl}/${id}`;
    return this.httpClient.get<Book>(bookUrl);
  }

  public createBook(book: Book): Observable<Book> {
    const bookUrl = `${this.apiBaseUrl}`;
    return this.httpClient
      .post<Book>(bookUrl, book, { headers: this.headers })
      .pipe(catchError(this.processErrorService.processError));
  }

  public updateBook(id: string, book: Book): Observable<Book> {
    const bookUrl = `${this.apiBaseUrl}/${id}`;
    return this.httpClient
      .patch<Book>(bookUrl, book, { headers: this.headers })
      .pipe(catchError(this.processErrorService.processError));
  }

  public deleteBook(id: string): Observable<Book> {
    const bookUrl = `${this.apiBaseUrl}/${id}`;
    return this.httpClient
      .delete<Book>(bookUrl, { headers: this.headers })
      .pipe(catchError(this.processErrorService.processError));
  }
}
