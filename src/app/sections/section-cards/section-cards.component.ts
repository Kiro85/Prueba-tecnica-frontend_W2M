import { Component, inject, OnInit } from '@angular/core';
import { AppCardHeroComponent } from '../../components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { HeroStoreService } from '../../services/hero-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-cards',
  imports: [CommonModule, AppCardHeroComponent],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
})
export class SectionCardsComponent implements OnInit {
  private readonly heroStoreService = inject(HeroStoreService);
  protected heroes = this.heroStoreService.heroes;
  protected loading = this.heroStoreService.loading;
  protected error = this.heroStoreService.error;

  ngOnInit(): void {
    this.heroStoreService.getHeroes();
  }
}
