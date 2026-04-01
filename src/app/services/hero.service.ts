import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroRequest } from '../models/hero';
import { HttpClient } from '@angular/common/http';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/heroes';

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  public getHeroesPaginated(page: number, limit: number): Observable<Page> {
    return this.http.get<Page>(`${this.apiUrl}?_page=${page}&_per_page=${limit}`);
  }

  public getHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}?name:contains=${name}`);
  }

  public createHeroe(request: HeroRequest): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, request);
  }

  public deleteHeroe(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.apiUrl}/${id}`);
  }

  public updateHeroe(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${hero.id}`, hero);
  }
}
