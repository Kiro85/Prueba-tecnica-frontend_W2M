import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { AppCardHeroComponent } from '../../components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { CommonModule } from '@angular/common';
import { AppButtonPrimaryComponent } from '../../components/dynamics/app-buttons/app-button-primary/app-button-primary.component';
import { AppSpinnerComponent } from '../../components/statics/app-spinner/app-spinner.component';
import { AppErrorMessageComponent } from '../../components/dynamics/app-error-message/app-error-message.component';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero';
import { catchError, finalize, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'section-cards',
  imports: [
    CommonModule,
    AppCardHeroComponent,
    AppButtonPrimaryComponent,
    AppSpinnerComponent,
    AppErrorMessageComponent,
  ],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
})
export class SectionCardsComponent implements OnInit {
  private readonly heroService = inject(HeroService);

  public heroesFiltered = signal<Hero[]>([]); // List of heroes filtered by name
  public query = input<string>();
  private queryEffect = effect(() => {
    const queryValue = this.query();
    if (queryValue) {
      this.getHeroesByName(queryValue);
    } else {
      this.heroesFiltered.set([]);
    }
  });
  public heroes = signal<Hero[]>([]); // List of heroes
  public page = signal<number>(1);
  public readonly heroesPerPage: number = 8;
  public nextPage = signal<boolean>(true);

  public loading = signal<boolean>(false);
  public error = signal<string>('');

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.getHeroesPaginated();
  }

  protected getHeroesPaginated(): void {
    this.loading.set(true);
    this.heroService
      .getHeroesPaginated(this.page(), this.heroesPerPage)
      .pipe(
        tap((res) => {
          this.handleResponse(res.data);
        }),
        catchError((err) => {
          this.error.set(err.message || '');
          console.error(
            'Error - section-cards.component.ts - getHeroesPaginated() / ' + err.message,
          );
          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private handleResponse(res: Hero[]): void {
    this.heroes.update((current) => [...current, ...res]);
    this.page.set(this.page() + 1);
    this.nextPage.set(res !== null);
  }

  private getHeroesByName(name: string): void {
    this.loading.set(true);
    this.heroService
      .getHeroesByName(name)
      .pipe(
        tap((res) => {
          this.heroesFiltered.set(res);
        }),
        catchError((err) => {
          this.error.set(err.message || '');
          console.error(
            'Error - section-cards.component.ts - getHeroesByName() / ' + err.message,
          )
          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
