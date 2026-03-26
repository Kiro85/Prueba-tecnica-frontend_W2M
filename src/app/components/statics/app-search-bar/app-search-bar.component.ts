import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AppButtonSearchComponent } from '../../dynamics/app-buttons/app-button-search/app-button-search.component';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { HeroStoreService } from '../../../services/hero-store.service';

@Component({
  selector: 'app-search-bar',
  imports: [AppButtonSearchComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './app-search-bar.component.html',
  styleUrl: './app-search-bar.component.scss',
})
export class AppSearchBarComponent implements OnInit, OnDestroy {
  private readonly heroStoreService = inject(HeroStoreService);

  protected query = new FormControl('');

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initSearchBar();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initSearchBar(): void {
    this.query.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => value?.trim() || null),
      )
      .subscribe((query) => this.heroStoreService.getHeroesByName(query));
  }
}
