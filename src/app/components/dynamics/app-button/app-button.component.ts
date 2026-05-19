import { Component, computed, input,  output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { Button } from '@interfaces/button';

@Component({
  selector: 'app-button',
  imports: [MatIcon],
  styleUrl: './app-button.component.scss',
  template: `
    <button class="c-button {{ buttonClass() }}" [disabled]="button()?.disabled" (click)="pressed.emit()">
      @if (button()?.icon) {
        <mat-icon fontIcon="{{ button()?.icon }}" ></mat-icon>
      }

      @if (button()?.content) {
        <p>{{ button()?.content }}</p>
      }
    </button>
  `,
})
export class AppButtonComponent {
  public button = input<Button>();
  public pressed = output<void>();

  buttonClass = computed(() => {
    const baseClass = 'c-button';
    const variantClass = this.button()?.customClass ? `c-button--${this.button()?.customClass}` : '';
    return `${baseClass} ${variantClass}`;
  })
}
