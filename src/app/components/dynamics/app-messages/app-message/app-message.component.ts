import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  imports: [MatIcon],
  styleUrl: './app-message.component.scss',
  template: `
    <article class="c-message {{ success() ? 'c-message--success' : 'c-message--error' }}">
      <mat-icon fontIcon="{{ success() ? 'check_circle' : 'error' }}"></mat-icon>
      <p><ng-content></ng-content></p>
    </article>
  `,
})
export class AppMessageComponent {
  public success = input<boolean>(false);
}
