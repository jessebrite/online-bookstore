import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetResponseBook } from '../interfaces/get-response-book';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl = 'http://localhost:8080/api/v1'

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    return this.httpClient.get<GetResponseBook>(`${this.apiBaseUrl}/books`)
      .pipe(
        map(response => response._embedded.books)
    );
  }

}

