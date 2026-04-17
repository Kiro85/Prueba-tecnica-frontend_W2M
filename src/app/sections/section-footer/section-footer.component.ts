import { Component } from '@angular/core';

import { FOOTER_DATA } from '../../constants/footer-data.constant';
import { Footer } from '@interfaces/footer';

@Component({
  selector: 'section-footer',
  imports: [],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.scss',
})
export class SectionFooterComponent {
  protected footer: Footer = {
    ...FOOTER_DATA,
    currentYear: new Date().getFullYear(),
  }
}
