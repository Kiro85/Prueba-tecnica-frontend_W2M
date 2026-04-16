import { Component, inject, input, output } from '@angular/core';

import { Hero } from '@models/hero';
import { Button } from '@interfaces/button';
import { CapitalizeWordsPipe } from '@shared/pipes/capitalize-words.pipe';
import { CapitalizeFirstPipe } from '@shared/pipes/capitalize-first.pipe';
import { DialogService } from '@services/dialog.service';
import { AppModalDeleteComponent } from '@components/dynamics/app-modals/app-modal-confirm-delete/app-modal-delete.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonComponent, CapitalizeWordsPipe, CapitalizeFirstPipe],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {
  private readonly dialogService = inject(DialogService);
  public hero = input.required<Hero>();
  public modified = output<void>();

  protected editButton: Button = {
    content: 'Editar',
    icon: 'edit',
    customClass: 'primary',
    disabled: false,
  };

  protected deleteButton: Button = {
    content: 'Eliminar',
    customClass: 'secondary',
    disabled: false,
  };

  protected openConfirmDeleteModal(): void {
    this.dialogService.openDialog(
      AppModalDeleteComponent,
      'Héroe eliminado con éxito',
      'Ha ocurrido un error al eliminar el héroe',
      this.hero(),
    );
  }

  protected openFormHeroEdit(): void {
    this.dialogService.openDialog(
      AppFormHeroComponent,
      'Héroe actualizado con éxito',
      'Ha ocurrido un error al actualizar el héroe',
      this.hero(),
    );
  }
}
