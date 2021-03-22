import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminBookService } from '../services/admin-book.service';
import { Book } from '@common/book';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit {
  book: Book = new Book();
	bookSent = false;
	submitted = false;

  constructor(private bookService: AdminBookService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
					this.submitted = true;
    if (form.valid) {
						this.bookSent = true;
      this.addBook(this.book);
    }
  }

  public addBook(book: Book): void {
    this.bookService.createBook(book).subscribe((data) => {
      console.log('data: ', data);
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
