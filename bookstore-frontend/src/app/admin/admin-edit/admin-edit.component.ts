import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminBookService } from '../services/admin-book.service';
import { Book } from '@common/book';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  // id = this.route.snapshot.params['id'];
  id = this.route.snapshot.params.id;
  book: Book = new Book();
  bookSent = false;
  submitted = false;

  constructor(
    private bookService: AdminBookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookService.getSingleBook(this.id).subscribe((data) => {
      // console.log('data: ', data),
      this.book = data;
    });
  }

  public onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this.bookSent = true;
      this.updateBook(this.id, this.book);
    }
  }

  public updateBook(id: string, book: Book): void {
    this.bookService.updateBook(id, book).subscribe((data) => {
      // console.log('data: ', data),
      this.book = data;
    });
    this.router.navigate(['/admin/dashboard']);
  }
}
