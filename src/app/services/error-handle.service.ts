import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error'

    if (error.error instanceof ErrorEvent) {
      // Client error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Server error
      errorMessage = `Error code: ${error.status}, message: ${error.message}`
    }

    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error
    }))
  }
}
