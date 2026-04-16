import { Component } from '@angular/core';

@Component({
  selector: 'section-footer',
  imports: [],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.scss',
})
export class SectionFooterComponent {
  protected currentYear: number = new Date().getFullYear();
  protected companyName: string = 'SUPERHEROCRUD, Inc';
  protected iconList: string[] = ['instagram', 'youtube', 'linkedin', 'facebook', 'x'];
}
