import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetResponseBook } from '../interfaces/get-response-book';
import { GetResponseBookCategory } from '../interfaces/get-response-book-category';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl = 'http://localhost:8080/api/v1/books';

  private bookCategoryUrl = 'http://localhost:8080/api/v1/book-categories';

  constructor(private httpClient: HttpClient) { }

  public getBooks(categoryId: number): Observable<Book[]> {
  	const searchUrl = `${this.apiBaseUrl}/search/category_id?id=${categoryId}`;
    return this.httpClient.get<GetResponseBook>(searchUrl)
      .pipe(
        map(response => response._embedded.books)
    );
  }

  public getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseBookCategory>(this.bookCategoryUrl)
      .pipe(
        map(response => response._embedded.bookCategory)
    );
  }

}

