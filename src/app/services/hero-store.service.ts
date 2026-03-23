import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Hero, HeroRequest } from '../models/hero';
import { HeroService } from './hero.service';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService implements OnDestroy {
  public heroes = signal<Hero[] | null>(null);
  public page = signal<number>(0);
  public nextPage = signal<boolean>(true);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly heroService = inject(HeroService);

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getHeroes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.heroService.getHeroes().subscribe({
      next: (data) => {
        this.heroes.set(data);
        this.loading.set(false);
      },

      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - hero-store.service.ts - GetHeroes() / ' + err.message);
      },
    });
  }

  public getHeroesPaginated(page: number, limit: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.heroService.getHeroesPaginated(page, limit).subscribe({
      next: (res) => {
        this.heroes.update((current) => [...(current ?? []), ...(res.data ?? [])]);
        this.page.set(page);
        this.nextPage.set(res.next !== null ? true : false);
        this.loading.set(false);
      },

      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - hero-store.service.ts - GetHoresPaginated() / ' + err.message);
      },
    });
  }

  public createHeroe(request: HeroRequest): Observable<Hero> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroService.createHeroe(request).pipe(
      tap((data) => {
        this.heroes.update((current) => [...(current ?? []), data]);
        this.loading.set(false);
      }),

      catchError((err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - hero-store.service.ts - CreateHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }

  public deleteHeroe(hero: Hero): Observable<Hero> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroService.deleteHeroe(hero.id).pipe(
      tap((data) => {
        this.heroes.update((current) => (current ? current.filter((h) => h.id !== data.id) : []));
        this.loading.set(false);
      }),

      catchError((err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - hero-store.service.ts - deleteHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }

  public updateHeroe(hero: Hero): Observable<Hero> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroService.updateHeroe(hero).pipe(
      tap((data) => {
        this.heroes.update((current) =>
          current ? current.map((h) => (h.id === data.id ? data : h)) : [],
        );
        this.loading.set(false);
      }),

      catchError((err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - hero-store.service.ts - updateHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }

  public searchHeroesByName(q: string): Hero[] | undefined {
    return this.heroes()?.filter((hero) =>
      hero.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()),
    );
  }
}
