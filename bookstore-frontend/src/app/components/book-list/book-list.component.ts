import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../common/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  private currentCategoryId = 0;
  private searchMode = false;
  public pageOfItems: Array<Book> = [];
  public pageSize = 6;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  public listBooks(): void {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  public pageClick(pageOfItems: Array<Book>): void {
    this.pageOfItems = pageOfItems;
  }

  private handleSearchBooks(): void {
    // Using '!'. Refer to handleListBooks() method
    const keyword: string = this.activatedRoute.snapshot.paramMap.get(
      'keyword'
    )!;

    this.bookService.searchBooksByKeywork(keyword).subscribe((data) => {
      this.books = data;
    }, this.handleError);
  }

  private handleListBooks(): void {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has(
      'id'
    );

    if (hasCategoryId) {
      // using non-null assertion operator '!'
      // since 'hasCategoryId' certainly contains a value by now,
      // it deals with "Object is possibly 'null'" error
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get(
        'id'
      )!;
    } else {
      this.currentCategoryId = 1;
    }

    this.bookService.getBooksById(this.currentCategoryId).subscribe((data) => {
      this.books = data;
    }, this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('Something has gone wrong', error);
    return error(error.message || error);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }
}
