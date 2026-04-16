import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Button } from '@interfaces/button';
import { HeroService } from '@services/hero.service';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';

@Component({
  selector: 'app-modal-delete.component',
  imports: [MatIcon, AppButtonComponent],
  templateUrl: './app-modal-delete.component.html',
  styleUrl: './app-modal-delete.component.scss',
})
export class AppModalDeleteComponent {
  private readonly dialogRef = inject(MatDialogRef<AppModalDeleteComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroService = inject(HeroService);

  protected confirmButton: Button = {
    content: 'Sí, eliminar',
    customClass: 'primary',
    disabled: false,
  };

  protected cancelButton: Button = {
    content: 'Cancelar',
    customClass: 'secondary',
    disabled: false,
  };

  protected deleteHero(): void {
    this.heroService.deleteHero(this.dialogData.hero.id)
    .subscribe((success) => {
      this.dialogRef.close(success);
    });
  }

  protected closeDeleteModal(): void {
    this.dialogRef.close();
  }
}
