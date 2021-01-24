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

  private apiBaseUrl = 'http://localhost:8080/api/v1/books'

  constructor(private httpClient: HttpClient) { }

  public getBooks(categoryId: number): Observable<Book[]> {
  	const searchUrl = `${this.apiBaseUrl}/search/category_id?id=${categoryId}`;
    return this.httpClient.get<GetResponseBook>(searchUrl)
      .pipe(
        map(response => response._embedded.books)
    );
  }

}

