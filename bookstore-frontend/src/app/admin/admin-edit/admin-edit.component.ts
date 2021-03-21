import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminBookService } from '../services/admin-book.service';
import { Book } from '@common/book';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  constructor(private bookService: AdminBookService, private router: Router) {}

  ngOnInit(): void {}

  public updateBook(id: string, book: Book): void {
    this.bookService.updateBook(id, book).subscribe((data) => {
      console.log('data: ', data);
    });
    this.router.navigate(['/admin/dashboard']);
  }
}
