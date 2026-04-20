import { inject, Injectable, signal } from '@angular/core';

import { catchError, finalize, tap, throwError } from 'rxjs';

import { Hero } from '@models/hero';
import { Page } from '@models/page';
import { HeroService } from '@services/hero/hero.service';

@Injectable({
  providedIn: 'root',
})
export class HeroManagerService {
  private readonly heroService = inject(HeroService);

  public heroesFiltered = signal<Hero[]>([]); // List of heroes filtered by name
  public heroes = signal<Hero[]>([]); // List of heroes
  public page = signal<number>(1);
  public nextPage = signal<boolean>(true);
  public readonly heroesPerPage: number = 8;

  public loading = signal<boolean>(true);
  public error = signal<string>('');

  public getHeroesPaginated(): void {
    this.heroService
      .getHeroesPaginated(this.page(), this.heroesPerPage)
      .pipe(
        tap((res: Page) => {
          this.handleResponse(res);
        }),
        catchError((err: any) => {
          this.error.set(err.message || '');
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }

  private handleResponse(res: Page): void {
    this.heroes.update((current) => [...current, ...res.data]);
    this.page.set(this.page() + 1);
    this.nextPage.set(res.next !== null);
  }

  public getHeroesByName(name: string): void {
    this.heroService
      .getHeroesByName(name)
      .pipe(
        tap((res: Hero[]) => {
          this.heroesFiltered.set(res);
        }),
        catchError((err: any) => {
          this.error.set(err.message || '');
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe();
  }

  public refresh(): void {
    this.resetPagination();
    this.getHeroesPaginated();
  }

  private resetPagination(): void {
    this.heroes.set([]);
    this.heroesFiltered.set([]);
    this.page.set(1);
    this.nextPage.set(true);
  }
}
