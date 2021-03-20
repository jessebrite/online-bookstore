import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  pageSize = 5;
  totalRecords = 0;

  constructor(
    private bookService: AdminBookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(() => {
    this.getBooks();
    // });
  }

  public getBooks(): void {
    this.bookService
      .getBooks(this.currentPage - 1, this.pageSize)
      .subscribe((data) => {
        console.log('data: ', data);
        this.books = data;
      });
  }
}
