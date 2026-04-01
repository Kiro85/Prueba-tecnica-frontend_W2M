import { Component, inject, Input, OnDestroy } from '@angular/core';
import { AppButtonEditComponent } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { Hero } from '../../../../models/hero';
import { AppButtonSecondaryComponent } from '../../app-buttons/app-button-secondary/app-button-secondary.component';
import { MatDialog } from '@angular/material/dialog';
import { AppModalConfirmDeleteComponent } from '../../app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppModalSuccessMessageComponent } from '../../app-modals/app-modal-success-message/app-modal-success-message.component';
import { AppModalErrorMessageComponent } from '../../app-modals/app-modal-error-message/app-modal-error-message.component';
import { FormatterService } from '../../../../services/formatter.service';
import { AppFormHeroComponent } from '../../../statics/app-forms/app-form-hero/app-form-hero.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEditComponent, AppButtonSecondaryComponent, AppButtonSecondaryComponent],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent implements OnDestroy {
  @Input() hero?: Hero;

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly formatterService = inject(FormatterService);

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected OpenConfirmDeleteModal(): void {
    const dialogRef = this.dialog.open(AppModalConfirmDeleteComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.snackBar.openFromComponent(AppModalErrorMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Este héroe se ha eliminado',
          },
        });
      } else if (result === 2) {
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

  protected OpenFormHeroEdit(): void {
    const dialogRef = this.dialog.open(AppFormHeroComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { hero: this.hero },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.snackBar.openFromComponent(AppModalSuccessMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Héroe modificado con éxito',
          },
        });
      } else if (result === 2) {
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
}
