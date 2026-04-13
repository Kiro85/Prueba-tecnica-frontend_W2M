import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-modal-message.component',
  imports: [MatIcon],
  styleUrl: './app-modal-message.component.scss',
  template: `
    <article class="c-modal {{ success ? 'c-modal--success' : 'c-modal--error' }}">
      <mat-icon>{{ success ? 'check_circle' : 'error' }}</mat-icon>
      <p>{{ snackBarData.message }}</p>
    </article>
  `,
})
export class AppModalMessageComponent {
  protected readonly snackBarData = inject(MAT_SNACK_BAR_DATA);
  protected readonly success = this.snackBarData.success;
}
