import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../../environments/environment';
import { SearchService } from '../../services/search.service';
import { GetResponseBook } from '../../interfaces/get-response-book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  // @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Output() results: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  // @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  loading = false;
  results: GetResponseBook[] = [];
  searchUrl = environment.apiBaseUrl;

  constructor(
    private elementRef: ElementRef,
    private searchService: SearchService,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    const keyword = '';
    this.searchBooks(keyword);
  }

  searchBooks(keyword: string): void {
    fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        map(($event: any) => $event.target.value),
        filter((text: string) => text.length > 2),
        debounceTime(250), // time until next keyup event fire
        distinctUntilChanged() // only fire if next event is diffirent
      )
      .subscribe((data: string) => {
        // this.loading = true;
        // console.log(data);
        this.searchService.searchByKeyword(data).subscribe(
          (result: GetResponseBook[]) => {
            // console.log('result: ', result);
            // this.loading = false;
            this.ngxSpinnerService.hide();
            this.results = result;
          },
          (err: any) => {
            this.loading = false;
            console.error(err);
          }
        );
      });
  }
}
