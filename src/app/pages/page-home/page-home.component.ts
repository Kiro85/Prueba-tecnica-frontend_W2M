import { Component } from '@angular/core';
import { SectionCardsComponent } from "../../sections/section-cards/section-cards.component";
import { AppBannerComponent } from '../../components/statics/app-banner/app-banner.component';
import { AppSearchBarComponent } from '../../components/dynamics/app-search-bar/app-search-bar.component';
import { AppButtonEditComponent } from '../../components/dynamics/app-buttons/app-button-edit/app-button-edit.component';

@Component({
  selector: 'page-home',
  imports: [
    SectionCardsComponent,
    AppBannerComponent,
    AppSearchBarComponent,
    AppButtonEditComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {

}
