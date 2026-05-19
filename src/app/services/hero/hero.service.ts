import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Hero } from '@models/hero';
import { Page } from '@models/page';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/heroes';

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  public getHeroesPaginated(page: number, limit: number): Observable<Page> {
    return this.http.get<Page>(this.apiUrl, {
      params: {
        _page: page,
        _per_page: limit,
      },
    });
  }

  public getHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl, {
      params: {
        'name:contains': name,
      }
    });
  }

  public createHero(request: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, request);
  }

  public deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.apiUrl}/${id}`);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${hero.id}`, hero);
  }
}
