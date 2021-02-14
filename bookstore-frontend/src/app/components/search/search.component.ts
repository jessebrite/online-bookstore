import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap } from 'rxjs/operators';
import { Book } from 'src/app/common/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<Book[]> = new EventEmitter<Book[]>();

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit(): void {}

  searchBooks(keyword: string): void {
    const search = this.router.navigateByUrl(`/search/${keyword}`);

    const fireBook = fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map(($event: any) => $event.target.value),
        filter((text: string) => text.length > 2),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((query: string) => search)
      )
      .subscribe((data) => console.log(data));
  }
}
