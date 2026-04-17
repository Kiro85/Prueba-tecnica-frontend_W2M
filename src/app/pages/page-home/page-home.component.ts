import { Component, inject } from '@angular/core';

import { HOME_DATA } from '../../constants/home-data.constant';
import { Button } from '@interfaces/button';
import { DialogService } from '@services/dialog.service';
import { SectionCardsComponent } from '@sections/section-cards/section-cards.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppSearchBarComponent } from '@components/statics/app-search-bar/app-search-bar.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';

@Component({
  selector: 'page-home',
  imports: [
    SectionCardsComponent,
    AppSearchBarComponent,
    AppButtonComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {
  private readonly dialogService = inject(DialogService);
  protected readonly homeData = HOME_DATA;

  protected createButton: Button = {
    content: 'Crear nuevo héroe',
    icon: 'add',
    customClass: 'primary',
    disabled: false,
  };

  protected openCreateHeroForm(): void {
    this.dialogService.openDialog(
      AppFormHeroComponent,
      'Héroe creado con éxito',
      'Ha ocurrido un error',
    );
  }
}
