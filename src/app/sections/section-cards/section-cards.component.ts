import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AppCardHeroComponent } from '../../components/dynamics/app-cards/app-card-hero/app-card-hero.component';
import { Heroe } from '../../models/heroe';
import { HttpErrorResponse } from '@angular/common/http';
import { HeroeService } from '../../services/heroe.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'section-cards',
  imports: [AppCardHeroComponent],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
})
export class SectionCardsComponent implements OnInit, OnDestroy {
  private loading = signal<boolean>(false);
  private error = signal<HttpErrorResponse | null>(null);
  protected heroes = signal<Heroe[]>([]);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly heroeService = inject(HeroeService);

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getHeroes(): void {
    this.loading.set(false);
    this.error.set(null);

    this.heroeService.getHeroes().subscribe({
      next: (data) => {
        this.heroes.set(data);
        this.loading.set(false);
      },

      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - section-cards.component.ts - GetHeroes() / ' + err.message);
      },
    });
  }
}
