import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Heroe } from '../models/heroe';
import { HttpClient } from '@angular/common/http';
import { ErrorHandleService } from './error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private readonly apiUrl = '/heroes'
  private readonly http = inject(HttpClient)
  private readonly errorHandleService = inject(ErrorHandleService)

  public getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(this.apiUrl).pipe(
      catchError(this.errorHandleService.handleError)
    )
  }
}
