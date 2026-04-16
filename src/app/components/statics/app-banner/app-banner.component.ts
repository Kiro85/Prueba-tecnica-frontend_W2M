import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  styleUrl: './app-banner.component.scss',
  template: `
    <header class="c-banner">
      <img class="c-banner__logo" src="{{ logoSrc }}" alt="{{ altText }}" />
    </header>
  `,
})
export class AppBannerComponent {
  protected logoSrc: string = 'assets/logo.svg';
  protected altText: string = 'Logo de la aplicación';
}
