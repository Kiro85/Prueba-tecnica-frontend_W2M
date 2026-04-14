import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinner],
  styleUrl: './app-spinner.component.scss',
  template: `
    <article class="c-spinner">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </article>
  `,
})
export class AppSpinnerComponent {}
