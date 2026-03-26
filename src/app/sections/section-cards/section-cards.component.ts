import { Component, inject, OnInit } from '@angular/core';
import { AppCardHeroComponent } from '../../components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { HeroStoreService } from '../../services/hero-store.service';
import { CommonModule } from '@angular/common';
import { AppButtonPrimaryComponent } from '../../components/dynamics/app-buttons/app-button-primary/app-button-primary.component';
import { AppSpinnerComponent } from '../../components/statics/app-spinner/app-spinner.component';
import { AppErrorMessageComponent } from '../../components/dynamics/app-error-message/app-error-message.component';

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
  private readonly heroStoreService = inject(HeroStoreService);

  protected heroesFiltered = this.heroStoreService.heroesFiltered;
  protected heroes = this.heroStoreService.heroes;
  private readonly heroesPerPage = this.heroStoreService.heroesPerPage;
  protected morePages = this.heroStoreService.nextPage;

  protected loading = this.heroStoreService.loading;
  protected error = this.heroStoreService.error;

  ngOnInit(): void {
    this.nextPage();
  }

  protected nextPage(): void {
    if (this.morePages()) {
      this.heroStoreService.getHeroesPaginated(this.heroStoreService.page() + 1, this.heroesPerPage);
    }
  }
}
