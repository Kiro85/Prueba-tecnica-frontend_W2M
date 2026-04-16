import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBannerComponent } from './components/statics/app-banner/app-banner.component';
import { SectionFooterComponent } from './sections/section-footer/section-footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBannerComponent, SectionFooterComponent],
  templateUrl: './app.html',
})
export class App {}
