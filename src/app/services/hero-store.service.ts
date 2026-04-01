import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Hero, HeroRequest } from '../models/hero';
import { HeroService } from './hero.service';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService implements OnDestroy {
  private readonly heroService = inject(HeroService);

  public heroesFiltered = signal<Hero[] | null>(null); // List of heroes filtered by name
  public heroes = signal<Hero[] | null>(null); // List of heroes
  public page = signal<number>(0);
  public readonly heroesPerPage: number = 8;
  public nextPage = signal<boolean>(true);

  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getHeroes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.heroService.getHeroes().subscribe({
      next: (res) => {
        this.heroes.set(res);
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

  public getHeroesByName(name: string | null): void {
    this.loading.set(true);
    this.error.set(null);

    if (name === null) {
      this.heroesFiltered.set(null);
      this.loading.set(false);
    } else {
      this.heroService.getHeroesByName(name).subscribe({
        next: (res) => {
          this.heroesFiltered.set(res);
          this.loading.set(false);
        },

        error: (err) => {
          this.error.set(err);
          this.loading.set(false);
          console.error('Error - hero-store.service.ts - getHeroesByName() / ' + err.message);
        },
      });
    }
  }

  // public createHero(request: HeroRequest): Observable<Hero> {
  //   this.loading.set(true);
  //   this.error.set(null);

  //   return this.heroService.createHeroe(request).pipe(
  //     tap(() => {
  //       this.page.set(0);
  //       this.heroes.set(null);
  //       this.getHeroesPaginated(this.page() + 1, this.heroesPerPage);
  //       this.loading.set(false);
  //     }),

  //     catchError((err) => {
  //       this.error.set(err);
  //       this.loading.set(false);
  //       console.error('Error - hero-store.service.ts - CreateHeroe() / ' + err.message);
  //       return throwError(() => err);
  //     }),
  //   );
  // }

  public deleteHeroe(hero: Hero): Observable<Hero> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroService.deleteHeroe(hero.id).pipe(
      tap((res) => {
        this.heroes.update((current) => (current ? current.filter((h) => h.id !== res.id) : []));
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

  // public updateHeroe(hero: Hero): Observable<Hero> {
  //   this.loading.set(true);
  //   this.error.set(null);

  //   return this.heroService.updateHeroe(hero).pipe(
  //     tap((res) => {
  //       this.heroes.update((current) =>
  //         current ? current.map((h) => (h.id === res.id ? res : h)) : [],
  //       );
  //       this.loading.set(false);
  //     }),

  //     catchError((err) => {
  //       this.error.set(err);
  //       this.loading.set(false);
  //       console.error('Error - hero-store.service.ts - updateHeroe() / ' + err.message);
  //       return throwError(() => err);
  //     }),
  //   );
  // }

  public searchHeroesByName(q: string): Hero[] | undefined {
    return this.heroes()?.filter((hero) =>
      hero.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()),
    );
  }
}
