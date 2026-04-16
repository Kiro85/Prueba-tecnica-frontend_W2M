import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  styleUrl: './app-banner.component.scss',
  template: `
    <header class="c-banner">
      <img class="c-banner__logo" src="assets/logo.svg" alt="W2M Logo" />
    </header>
  `,
})
export class AppBannerComponent {}
