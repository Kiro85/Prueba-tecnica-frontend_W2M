import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppButtonSearchComponent } from '../app-buttons/app-button-search/app-button-search.component';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [AppButtonSearchComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './app-search-bar.component.html',
  styleUrl: './app-search-bar.component.scss',
})
export class AppSearchBarComponent implements OnInit, OnDestroy {
  protected query = new FormControl('');
  @Output() queryChange = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initSearchBar()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initSearchBar(): void {
    this.query.valueChanges.subscribe(value => {
      this.queryChange.emit(value ?? '');
    })
  }
}
