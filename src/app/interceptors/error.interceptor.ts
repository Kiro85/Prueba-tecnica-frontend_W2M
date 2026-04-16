import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Unknown error';

      if (error.error instanceof ErrorEvent) {
        message = error.error.message;
      } else {
        message = `Code ${error.status}: ${error.message}`;
      }

      const customError = {
        status: error.status,
        message: message,
        details: error.error,
      };

      return throwError(() => customError);
    })
  );
};
