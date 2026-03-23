import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Heroe, HeroeRequest } from '../models/heroe';
import { HeroeService } from './heroe.service';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroeStoreService implements OnDestroy {
  public heroes = signal<Heroe[] | null>(null);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly heroeService = inject(HeroeService);

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
        console.error('Error - heroe-store.service.ts - GetHeroes() / ' + err.message);
      },
    });
  }

  public createHeroe(request: HeroeRequest): Observable<Heroe> {
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
        console.error('Error - heroe-store.service.ts - CreateHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }

  public deleteHeroe(heroe: Heroe): Observable<Heroe> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroeService.deleteHeroe(heroe.id).pipe(
      tap((data) => {
        this.heroes.update((current) => (current ? current.filter((h) => h.id !== data.id) : []));
        this.loading.set(false);
      }),

      catchError((err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - heroe-store.service.ts - deleteHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }

  public updateHeroe(heroe: Heroe): Observable<Heroe> {
    this.loading.set(true);
    this.error.set(null);

    return this.heroeService.updateHeroe(heroe).pipe(
      tap((data) => {
        this.heroes.update((current) => current ? current.map(h => h.id === data.id ? data : h) : []);
        this.loading.set(false);
      }),

      catchError((err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - heroe-store.service.ts - updateHeroe() / ' + err.message);
        return throwError(() => err);
      }),
    );
  }
}
