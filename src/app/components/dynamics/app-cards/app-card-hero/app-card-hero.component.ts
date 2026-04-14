import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { tap } from 'rxjs';

import { Hero } from '@models/hero';
import { CapitalizeWordsPipe } from '@shared/pipes/capitalize-words.pipe';
import { CapitalizeFirstPipe } from '@shared/pipes/capitalize-first.pipe';
import { AppModalConfirmDeleteComponent } from '@components/dynamics/app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { AppModalMessageComponent } from '@components/dynamics/app-modals/app-modal-message/app-modal-message.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonComponent, CapitalizeWordsPipe, CapitalizeFirstPipe],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {
  public hero = input<Hero>();
  public modified = output<void>();

  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private readonly destroyRef = inject(DestroyRef);

  protected openConfirmDeleteModal(): void {
    const dialogRef = this.dialog.open(AppModalConfirmDeleteComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { hero: this.hero },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((success) => {
          if (success === true) {
            this.showSnackbar('Héroe eliminado con éxito', true);
            this.modified.emit();
          } else if (success === false) {
            this.showSnackbar('Ha ocurrido un error', false);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected openFormHeroEdit(): void {
    const dialogRef = this.dialog.open(AppFormHeroComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { hero: this.hero },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((success) => {
          if (success === true) {
            this.showSnackbar('Héroe editado con éxito', true);
            this.modified.emit();
          } else if (success === false) {
            this.showSnackbar('Ha ocurrido un error', false);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private showSnackbar(message: string, success: boolean): void {
    this.snackBar.openFromComponent(AppModalMessageComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: {
        message,
        success,
      },
    });
  }
}
