import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AppFormHeroCreateComponent } from '../../../statics/app-forms/app-form-hero-create/app-form-hero-create.component';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppModalSuccessMessageComponent } from '../../../statics/app-modals/app-modal-success-message/app-modal-success-message.component';
import { AppModalErrorMessageComponent } from '../../../statics/app-modals/app-modal-error-message/app-modal-error-message.component';

@Component({
  selector: 'app-button-create',
  imports: [MatIcon],
  templateUrl: './app-button-create.component.html',
  styleUrl: './app-button-create.component.scss',
})
export class AppButtonCreateComponent implements OnDestroy {
  private readonly dialog: MatDialog = new MatDialog();
  private readonly snackBar: MatSnackBar = new MatSnackBar();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  OpenCreateHeroeForm(): void {
    const dialogRef = this.dialog.open(AppFormHeroCreateComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.openFromComponent(AppModalSuccessMessageComponent, {
          duration: 5000,
          verticalPosition: 'top',
          data: {
            message: 'Héroe creado con éxito',
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
}
