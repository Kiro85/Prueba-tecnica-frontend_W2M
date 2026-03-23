import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Heroe, HeroeRequest } from '../models/heroe';
import { HttpClient } from '@angular/common/http';
import { ErrorHandleService } from './error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private readonly apiUrl = 'http://localhost:3000/heroes';
  private readonly http = inject(HttpClient);
  private readonly errorHandleService = inject(ErrorHandleService);

  public getHeroes(): Observable<Heroe[]> {
    return this.http
      .get<Heroe[]>(this.apiUrl)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public createHeroe(request: HeroeRequest): Observable<Heroe> {
    return this.http
      .post<Heroe>(this.apiUrl, request)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public deleteHeroe(id: string): Observable<Heroe> {
    return this.http
      .delete<Heroe>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http
      .put<Heroe>(`${this.apiUrl}/${heroe.id}`, heroe)
      .pipe(catchError(this.errorHandleService.handleError))
  }
}
