import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { AdminBookService } from '../services/admin-book.service';
import { Book } from '@common/book';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  books: Book[] = [];
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;
  maxSize = 3;

  constructor(
    private bookService: AdminBookService,
    private ngxSpinnerService: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(() => {
    this.getBooks();
    // });
  }

  public getBooks(): void {
    this.ngxSpinnerService.show();
    this.bookService.getBooks(this.currentPage - 1, this.pageSize).subscribe(
      // (data) => {
      // console.log('data: ', data);
      // this.books = data;
      this.processPaginate()
    );
  }

  public deleteBook(book: string): void {
    if (window.confirm('Are you sure?')) {
      this.bookService.deleteBook(book).subscribe((data) => {
        this.books.splice(
          this.books.findIndex((tempItem) => data.id === tempItem.id),
          1
        );
      });
    }
  }

  private processPaginate(): any {
    return (data: any) => {
      // console.log('daga: ', data);
      // hide spinner once there's data
      this.ngxSpinnerService.hide();
      // assign returned data to books
      this.books = data._embedded.books;
      // starts from index 1
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }
}
