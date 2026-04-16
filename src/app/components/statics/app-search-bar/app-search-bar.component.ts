import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, distinctUntilChanged, map } from 'rxjs';

import { Button } from '@interfaces/button';
import { HeroSearchService } from '@services/hero-search.service';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';

@Component({
  selector: 'app-search-bar',
  imports: [AppButtonComponent, ReactiveFormsModule],
  styleUrl: './app-search-bar.component.scss',
  template: `
    <article class="c-search-bar">
      <input
        class="c-search-bar__input"
        type="text"
        placeholder="Busca un héroe"
        [formControl]="searchControl"
      />
      <app-button [button]="searchButton"></app-button>
    </article>
  `,
})
export class AppSearchBarComponent implements OnInit {
  private readonly heroSearchService = inject(HeroSearchService);
  protected searchControl = new FormControl('');
  private destroyRef = inject(DestroyRef);

  protected searchButton: Button = {
    icon: 'search',
    customClass: 'search',
    disabled: false,
  };

  public ngOnInit(): void {
    this.initSearch();
  }

  private initSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => value?.trim() ?? ''),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.heroSearchService.search(value);
      });
  }
}
