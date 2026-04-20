import { Component } from '@angular/core';

import { BANNER_DATA } from '@constants/banner-data.constant';

@Component({
  selector: 'app-banner',
  imports: [],
  styleUrl: './app-banner.component.scss',
  template: `
    <header class="c-banner">
      <img class="c-banner__logo" src="{{ bannerData.logoSrc }}" alt="{{ bannerData.altText }}" />
    </header>
  `,
})
export class AppBannerComponent {
  protected bannerData = BANNER_DATA;
}
