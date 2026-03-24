import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Hero, HeroRequest } from '../models/hero';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ErrorHandleService } from './error-handle.service';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly apiUrl = 'http://localhost:3000/heroes';
  private readonly http = inject(HttpClient);
  private readonly errorHandleService = inject(ErrorHandleService);

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl).pipe(catchError(this.errorHandleService.handleError));
  }

  public getHeroesPaginated(page: number, limit: number): Observable<Page> {
    return this.http
      .get<Page>(`${this.apiUrl}?_page=${page}&_per_page=${limit}`)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public getHeroesByName(name: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.apiUrl}?name:contains=${name}`)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public createHeroe(request: HeroRequest): Observable<Hero> {
    return this.http
      .post<Hero>(this.apiUrl, request)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public deleteHeroe(id: string): Observable<Hero> {
    return this.http
      .delete<Hero>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandleService.handleError));
  }

  public updateHeroe(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.apiUrl}/${hero.id}`, hero)
      .pipe(catchError(this.errorHandleService.handleError));
  }
}
