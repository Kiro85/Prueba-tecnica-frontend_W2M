import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Button } from '@interfaces/button';
import { HeroSearchService } from '@services/hero/hero-search.service';
import { HeroReloadService } from '@services/hero/hero-reload.service';
import { HeroManagerService } from '@services/hero/hero-manager.service';
import { AppCardHeroComponent } from '@components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { AppMessageComponent } from '@components/dynamics/app-messages/app-message/app-message.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppSpinnerComponent } from '@components/statics/app-spinner/app-spinner.component';

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
  private readonly heroReloadService = inject(HeroReloadService);
  private readonly heroSearchService = inject(HeroSearchService);
  private readonly heroManagerService = inject(HeroManagerService);

  public heroes = this.heroManagerService.heroes;
  public heroesFiltered = this.heroManagerService.heroesFiltered;
  public loading = this.heroManagerService.loading;
  public error = this.heroManagerService.error;
  private readonly destroyRef = inject(DestroyRef);

  protected moreButton = computed<Button>(() => ({
    content: 'Ver más',
    customClass: 'primary',
    disabled: !this.heroManagerService.nextPage(),
  }));

  public ngOnInit(): void {
    this.loadMoreHeroes();
    this.reloadHeroes();
    this.searchHeroes();
  }

  private reloadHeroes(): void {
    this.heroReloadService.reload$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.heroManagerService.refresh();
    });
  }

  private searchHeroes(): void {
    this.heroSearchService.search$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((query) => {
      this.heroManagerService.getHeroesByName(query);
    });
  }

  protected loadMoreHeroes(): void {
    this.heroManagerService.getHeroesPaginated();
  }

  protected refreshHeroes(): void {
    this.heroManagerService.refresh();
  }
}
