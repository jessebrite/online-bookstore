import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessErrorService {
  constructor() {}

  processError(error: any): Observable<any> {
    let message = '';
    if (error.error instanceof ErrorEvent) { // client-side
      message = error.error.message;
    } else { // server-side
      // message = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      message = error.error.message;
    }
    // console.log(message);
    return throwError(message);
  }
}
