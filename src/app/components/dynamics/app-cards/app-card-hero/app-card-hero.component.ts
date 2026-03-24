import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppButtonEditComponent } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { Hero } from '../../../../models/hero';
import { AppButtonSecondaryComponent } from '../../app-buttons/app-button-secondary/app-button-secondary.component';
import { MatDialog } from '@angular/material/dialog';
import { AppModalConfirmDeleteComponent } from '../../../statics/app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { AppFormHeroEditComponent } from '../../../statics/app-forms/app-form-hero-edit/app-form-hero-edit.component';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppModalSuccessMessageComponent } from '../../../statics/app-modals/app-modal-success-message/app-modal-success-message.component';
import { AppModalErrorMessageComponent } from '../../../statics/app-modals/app-modal-error-message/app-modal-error-message.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEditComponent, AppButtonSecondaryComponent, AppButtonSecondaryComponent],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent implements OnDestroy {
  @Input() hero?: Hero;

  private readonly dialog: MatDialog = new MatDialog();
  private readonly snackBar: MatSnackBar = new MatSnackBar();

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
        this.snackBar.openFromComponent(AppModalSuccessMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Este héroe se ha eliminado',
          },
        });
      } else {
        this.snackBar.openFromComponent(AppModalErrorMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Ha ocurrido un error',
          },
        });
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
        this.snackBar.openFromComponent(AppModalSuccessMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Héroe modificado con éxito',
          },
        });
      } else {
        this.snackBar.openFromComponent(AppModalErrorMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Ha ocurrido un error',
          },
        });
      }
    });
  }

  protected firstCharToUpperCase(word: string | undefined): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
