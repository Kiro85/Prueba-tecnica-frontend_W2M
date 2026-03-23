import { Component, Input } from '@angular/core';
import { AppButtonEditComponent } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { Heroe } from '../../../../models/heroe';
import { AppButtonSecondaryComponent } from "../../app-buttons/app-button-secondary/app-button-secondary.component";
import { MatDialog } from '@angular/material/dialog';
import { AppModalConfirmDeleteComponent } from '../../../statics/app-modals/app-modal-delete/app-modal-confirm-delete.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEditComponent, AppButtonSecondaryComponent, AppButtonSecondaryComponent],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {
  @Input() heroe?: Heroe;
  private readonly dialog: MatDialog = new MatDialog();

  protected OpenConfirmDeleteModal(): void {
    const dialogRef = this.dialog.open(AppModalConfirmDeleteComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
        })
  }
}
