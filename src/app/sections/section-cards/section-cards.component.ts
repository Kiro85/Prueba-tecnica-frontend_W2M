import { Component, DestroyRef, effect, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, finalize, tap, throwError } from 'rxjs';

import { Hero } from '@models/hero';
import { Page } from '@models/page';
import { Button } from '@interfaces/button';
import { HeroService } from '@services/hero.service';
import { AppSpinnerComponent } from '@components/statics/app-spinner/app-spinner.component';
import { AppCardHeroComponent } from '@components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { AppMessageComponent } from '@components/dynamics/app-messages/app-message/app-message.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { HeroReloadService } from '@services/hero-reload.service';

@Component({
  selector: 'section-cards',
  imports: [
    CommonModule,
    AppCardHeroComponent,
    AppButtonComponent,
    AppSpinnerComponent,
    AppMessageComponent,
  ],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
})
export class SectionCardsComponent implements OnInit {
  private readonly heroService = inject(HeroService);
  private readonly heroReloadService = inject(HeroReloadService);

  public heroesFiltered = signal<Hero[]>([]); // List of heroes filtered by name
  public query = input<string>();
  public heroes = signal<Hero[]>([]); // List of heroes
  public page = signal<number>(1);
  public readonly heroesPerPage: number = 8;
  public nextPage = signal<boolean>(true);

  public loading = signal<boolean>(true);
  public error = signal<string>('');

  private queryEffect = effect(() => {
    const queryValue = this.query();
    if (queryValue) {
      this.getHeroesByName(queryValue);
    } else {
      this.heroesFiltered.set([]);
    }
  });
  private readonly moreButtonEffect = effect(() => {
    this.moreButton.update((current) => ({
      ...current,
      disabled: !this.nextPage(),
    }));
  });

  protected moreButton = signal<Button>({
    content: 'Ver más',
    customClass: 'primary',
    disabled: !this.nextPage(),
  });


  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.getHeroesPaginated();

    this.heroReloadService.reload$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.refresh();
      });
  }

  public getHeroesPaginated(): void {
    this.heroService
      .getHeroesPaginated(this.page(), this.heroesPerPage)
      .pipe(
        tap((res) => {
          this.handleResponse(res);
        }),
        catchError((err) => {
          this.error.set(err.message || '');
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private handleResponse(res: Page): void {
    this.heroes.update((current) => [...current, ...res.data]);
    this.page.set(this.page() + 1);
    this.nextPage.set(res.next !== null);
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
          return throwError(() => err);
        }),
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntilDestroyed(this.destroyRef),
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
