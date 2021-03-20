import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private bookService: AdminBookService,
    private ngxSpinnerService: NgxSpinnerService,
    private ngbConfig: NgbPaginationConfig,
    private route: ActivatedRoute
  ) {
    ngbConfig.maxSize = 3;
  }

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

  public deleteBook(id: string): void {}

  private processPaginate(): any {
    return (data: any) => {
      console.log('daga: ', data);
      this.ngxSpinnerService.hide(); // hide spinner once there's data
      this.books = data._embedded.books; // assign returned data to books
      this.currentPage = data.page.number + 1; // starts from index 1
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }
}
