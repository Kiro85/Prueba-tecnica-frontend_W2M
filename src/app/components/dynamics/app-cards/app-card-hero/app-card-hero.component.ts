import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { Hero } from '../../../../models/hero';
import { MatDialog } from '@angular/material/dialog';
import { AppModalConfirmDeleteComponent } from '../../app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppFormHeroComponent } from '../../../statics/app-forms/app-form-hero/app-form-hero.component';
import { AppModalMessageComponent } from '../../app-modals/app-modal-message/app-modal-message.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { CapitalizeWordsPipe } from '../../../../shared/pipes/capitalize-words.pipe';
import { CapitalizeFirstPipe } from '../../../../shared/pipes/capitalize-first.pipe';
import { AppButtonComponent } from '../../app-button/app-button.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonComponent, CapitalizeWordsPipe, CapitalizeFirstPipe],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {
  public hero = input<Hero>();
  public deleted = output<void>();
  public edited = output<void>();

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private readonly destroyRef = inject(DestroyRef);

  protected OpenConfirmDeleteModal(): void {
    const dialogRef = this.dialog.open(AppModalConfirmDeleteComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { hero: this.hero },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result === 1) {
            this.snackBar.openFromComponent(AppModalMessageComponent, {
              duration: 5000,
              verticalPosition: 'top',
              data: {
                message: 'Este héroe se ha eliminado',
                success: true,
              },
            });
            this.deleted.emit();
          } else if (result === 2) {
            this.snackBar.openFromComponent(AppModalMessageComponent, {
              duration: 5000,
              verticalPosition: 'top',
              data: {
                message: 'Ha ocurrido un error',
                success: false,
              },
            });
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected OpenFormHeroEdit(): void {
    const dialogRef = this.dialog.open(AppFormHeroComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { hero: this.hero },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result === 1) {
            this.snackBar.openFromComponent(AppModalMessageComponent, {
              duration: 5000,
              verticalPosition: 'top',
              data: {
                message: 'Este héroe se ha modificado',
                success: true,
              },
            });
            this.edited.emit();
          } else if (result === 2) {
            this.snackBar.openFromComponent(AppModalMessageComponent, {
              duration: 5000,
              verticalPosition: 'top',
              data: {
                message: 'Ha ocurrido un error',
                success: false,
              },
            });
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
