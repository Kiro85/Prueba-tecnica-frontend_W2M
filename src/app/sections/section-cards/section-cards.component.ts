import { Component, inject, OnInit} from '@angular/core';
import { AppCardHeroComponent } from '../../components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { HeroeStoreService } from '../../services/heroe-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-cards',
  imports: [CommonModule, AppCardHeroComponent],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
})
export class SectionCardsComponent implements OnInit {
  private readonly heroeStoreService = inject(HeroeStoreService);
  protected heroes = this.heroeStoreService.heroes;
  protected loading = this.heroeStoreService.loading;
  protected error = this.heroeStoreService.error;

  ngOnInit(): void {
    this.heroeStoreService.getHeroes();
  }
}
