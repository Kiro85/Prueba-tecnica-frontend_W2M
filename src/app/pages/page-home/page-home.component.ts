import { Component } from '@angular/core';
import { SectionCardsComponent } from '../../sections/section-cards/section-cards.component';
import { AppBannerComponent } from '../../components/statics/app-banner/app-banner.component';
import { AppSearchBarComponent } from '../../components/dynamics/app-search-bar/app-search-bar.component';
import { AppButtonCreateComponent } from '../../components/dynamics/app-buttons/app-button-create/app-button-create.component';
import { SectionFooterComponent } from '../../sections/section-footer/section-footer.component';

@Component({
  selector: 'page-home',
  imports: [
    SectionCardsComponent,
    SectionFooterComponent,
    AppBannerComponent,
    AppSearchBarComponent,
    AppButtonCreateComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {}
