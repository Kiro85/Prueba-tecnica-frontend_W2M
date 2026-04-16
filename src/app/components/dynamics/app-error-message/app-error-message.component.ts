import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  styleUrl: './app-error-message.component.scss',
  template: `
    <article class="c-error-message">
      <span class="c-error-message__title">Ha ocurrido un error!</span>
      <span class="c-error-message__text">
        <ng-content></ng-content>
      </span>
    </article>
  `,
})
export class AppErrorMessageComponent {}
