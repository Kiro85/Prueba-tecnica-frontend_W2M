import { Component } from '@angular/core';

import { FOOTER_DATA } from '@constants/footer-data.constant';

@Component({
  selector: 'section-footer',
  imports: [],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.scss',
})
export class SectionFooterComponent {
  protected footerData = FOOTER_DATA;
}
