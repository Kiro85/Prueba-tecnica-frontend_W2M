import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppButtonEditComponent } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { Hero } from '../../../../models/hero';
import { AppButtonSecondaryComponent } from '../../app-buttons/app-button-secondary/app-button-secondary.component';
import { MatDialog } from '@angular/material/dialog';
import { AppModalConfirmDeleteComponent } from '../../../statics/app-modals/app-modal-delete/app-modal-confirm-delete.component';
import { AppFormHeroEditComponent } from '../../../statics/app-forms/app-form-hero-edit/app-form-hero-edit.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEditComponent, AppButtonSecondaryComponent, AppButtonSecondaryComponent],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent implements OnDestroy {
  @Input() hero?: Hero;

  private readonly dialog: MatDialog = new MatDialog();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected OpenConfirmDeleteModal(): void {
    const dialogRef = this.dialog.open(AppModalConfirmDeleteComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.hero,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('Heroe eliminado correctamente!');
      } else {
        alert('Error al eliminar el héroe');
      }
    });
  }

  protected OpenFormHeroeEdit(): void {
    const dialogRef = this.dialog.open(AppFormHeroEditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: this.hero,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('Heroe editado correctamente!');
      } else {
        alert('Error al editar el héroe');
      }
    });
  }
}
