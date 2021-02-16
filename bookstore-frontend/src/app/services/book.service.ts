import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetResponseBook } from '@interfaces/get-response-book';
import { GetResponseBookCategory } from '@interfaces/get-response-book-category';
import { Book } from '@common/book';
import { BookCategory } from '@common/book-category';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getBooksById(
    categoryId: number,
    currentPage: number,
    pageSize: number
  ): Observable<GetResponseBook> {
    const params: string = [
      `id=${categoryId}`,
      `page=${currentPage}`,
      `size=${pageSize}`,
    ].join('&');
    const searchUrl = `${this.apiBaseUrl}/books/search/categoryId?${params}`;
    return this.httpClient.get<GetResponseBook>(searchUrl);
  }

  public getBookCategories(): Observable<BookCategory[]> {
    const bookCategoryUrl = `${this.apiBaseUrl}/book-categories`;
    return this.httpClient
      .get<GetResponseBookCategory>(bookCategoryUrl)
      .pipe(map((response) => response._embedded.bookCategories));
  }

  public searchBooksByKeywork(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.apiBaseUrl}/books/search/searchByKeyword?name=${keyword}`;
    // return this.getBooksList(searchUrl);
    return this.httpClient
      .get<GetResponseBook>(searchUrl)
      .pipe(map((response) => response._embedded.books));
  }

  public getBookDetails(bookId: number): Observable<Book> {
    const bookDetailsUrl = `${this.apiBaseUrl}/books/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }
}
