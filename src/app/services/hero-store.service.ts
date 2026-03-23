import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Hero, HeroRequest } from '../models/hero';
import { HeroService } from './hero.service';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService implements OnDestroy {
  public heroes = signal<Hero[] | null>(null);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly heroeService = inject(HeroService);

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getHeroes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.heroeService.getHeroes().subscribe({
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

  public createHeroe(request: HeroRequest): Observable<Hero> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroeService.createHeroe(request).pipe(
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

    return this.heroeService.deleteHeroe(hero.id).pipe(
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

    return this.heroeService.updateHeroe(hero).pipe(
      tap((data) => {
        this.heroes.update((current) => current ? current.map(h => h.id === data.id ? data : h) : []);
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
}
