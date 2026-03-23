import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppButtonSecondaryComponent } from '../../../dynamics/app-buttons/app-button-secondary/app-button-secondary.component';
import { AppButtonPrimaryComponent } from '../../../dynamics/app-buttons/app-button-primary/app-button-primary.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroeStoreService } from '../../../../services/heroe-store.service';
import { Heroe } from '../../../../models/heroe';

@Component({
  selector: 'app-modal-confirm-delete.component',
  imports: [MatIcon, AppButtonSecondaryComponent, AppButtonPrimaryComponent],
  templateUrl: './app-modal-confirm-delete.component.html',
  styleUrl: './app-modal-confirm-delete.component.scss',
})
export class AppModalConfirmDeleteComponent {
  private readonly dialogRef = inject(MatDialogRef<AppModalConfirmDeleteComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroeStoreService = inject(HeroeStoreService);

  protected DeleteHeroe(): void {
    this.heroeStoreService.deleteHeroe(this.dialogData).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }

  protected CloseConfirmDeleteModal(): void {
    this.dialogRef.close();
  }
}
