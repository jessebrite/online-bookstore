import { Component, OnInit } from '@angular/core';
import { BookService } from '@services/book.service';
import { Observable } from 'rxjs';

import { BookCategory } from '@common/book-category';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css'],
})
export class BookCategoryComponent implements OnInit {
  bookCategories: BookCategory[] = [];

  constructor(
    private bookService: BookService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.listBookCategories();
  }

  public listBookCategories(): void {
    this.bookService.getBookCategories().subscribe((data) => {
      this.ngxSpinnerService.hide();
      this.bookCategories = data;
    }, this.handleError);
  }

  private handleError(error: any): Observable<any> {
    // console.error('Something has gone wrong', error);
    return error(error.message || error);
  }
}
