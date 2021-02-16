import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '@environments/environment';
import { SearchService } from '@services/search.service';
import { GetResponseBook } from '@interfaces/get-response-book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
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
        map(($event: any) => $event.target.value), // extract the event's value
        filter((text: string) => text.length > 2), // filter out >2 words
        debounceTime(250), // 2.5ms time until next keyup event fires
        distinctUntilChanged() // only fire if next event is diffirent
      )
      .subscribe((data: string) => {
        this.searchService.searchByKeyword(data).subscribe(
          (result: GetResponseBook[]) => {
            this.ngxSpinnerService.hide(); // hide loader when there's data
            this.results = result; // pass retrieved data to results
          },
          (err: any) => {
            this.ngxSpinnerService.hide(); // hide loader when there's error
            return err;
          }
        );
      });
  }
}
