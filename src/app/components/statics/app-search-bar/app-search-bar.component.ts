import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppButtonComponent } from '../../dynamics/app-button/app-button.component';

@Component({
  selector: 'app-search-bar',
  imports: [AppButtonComponent, ReactiveFormsModule],
  templateUrl: './app-search-bar.component.html',
  styleUrl: './app-search-bar.component.scss',
})
export class AppSearchBarComponent implements OnInit {
  protected queryControl = new FormControl('');
  public query = output<string>();

  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.initSearchBar();
  }

  private initSearchBar(): void {
    this.queryControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => value?.trim() ?? ''),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.query.emit(value);
      });
  }
}
