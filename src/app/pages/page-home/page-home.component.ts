import { Component } from '@angular/core';
import { SectionCardsComponent } from "../../sections/section-cards/section-cards.component";
import { AppBannerComponent } from '../../components/statics/app-banner/app-banner.component';

@Component({
  selector: 'page-home',
  imports: [SectionCardsComponent, AppBannerComponent],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {

}
