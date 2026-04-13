import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatIcon],
  styleUrl: './app-button.component.scss',
  template: `
    <button class="c-button {{ class() }}" [disabled]="disabled()">
      @if (icon()) {
        <mat-icon>{{ icon() }}</mat-icon>
      }
      @if (text()) {
        <p>{{ text() }}</p>
      }
    </button>
  `,
})
export class AppButtonComponent {
  public icon = input<string>();
  public text = input<string>();
  public class = input<string>();
  public disabled = input<boolean>(false);
}
