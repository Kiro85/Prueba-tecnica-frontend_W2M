import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatIcon],
  styleUrl: './app-button.component.scss',
  template: `
    <button class="c-button {{ customClass() }}" [disabled]="disabled()" (click)="pressed.emit()">
      @if (icon()) {
        <mat-icon fontIcon="{{ icon() }}" ></mat-icon>
      }

      @if (customClass() !== 'c-button--search') {
        <p>
          <ng-content></ng-content>
        </p>
      }
    </button>
  `,
})
export class AppButtonComponent {
  public icon = input<string>();
  public customClass = input<string>();
  public disabled = input<boolean>(false);
  public pressed = output<void>();
}
