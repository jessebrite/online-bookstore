import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { BookService } from '@services/book.service';
import { Observable } from 'rxjs';
import { Book } from '@common/book';
import { CartItem } from '@common/cart-item';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  private currentCategoryId = 0;
  private searchMode = false;
  private previousCategory = 1;

  // server-side paging properties
  currentPage = 1;
  pageSize = 5;
  totalRecords = 0;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private ngxSpinnerService: NgxSpinnerService,
    private ngbConfig: NgbPaginationConfig
  ) {
    ngbConfig.maxSize = 3;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  public listBooks(): void {
    this.ngxSpinnerService.show(); // show spinner on page load
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  public updatePageSize($event: Event): void {
    this.pageSize = +($event.target as HTMLSelectElement).value;
    this.listBooks();
  }

  public addToCart(book: Book): void {
    const cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }

  private handleSearchBooks(): void {
    // Using '!'. Refer to handleListBooks() method
    const keyword: string = this.route.snapshot.paramMap.get(
      'keyword'
    )!;

    this.bookService.searchBooksByKeywork(keyword).subscribe((data) => {
      this.books = data;
    }, this.handleError);
  }

  private handleListBooks(): void {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has(
      'id'
    );

    if (hasCategoryId) {
      // using non-null assertion operator '!'
      // since 'hasCategoryId' certainly contains a value by now,
      // it deals with "Object is possibly 'null'" error
      this.currentCategoryId = +this.route.snapshot.paramMap.get(
        'id'
      )!;
    } else {
      this.currentCategoryId = 1;
    }

    // Set currentPage to 1 if user navigates to a different category
    if (this.previousCategory !== this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategoryId;

    this.bookService
      .getBooksById(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate(), this.handleError);
  }

  private processPaginate(): any {
    return (data: any) => {
						console.log('data: ', data)
      this.ngxSpinnerService.hide(); // hide spinner once there's data
      this.books = data._embedded.books; // assign returned data to books
      this.currentPage = data.page.number + 1; // starts from index 1
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }

  private handleError(error: any): Observable<any> {
    // console.error('Something has gone wrong', error);
    return error(error.message || error);
  }
}
