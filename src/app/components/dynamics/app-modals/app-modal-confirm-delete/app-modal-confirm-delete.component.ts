import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppButtonSecondaryComponent } from '../../../dynamics/app-buttons/app-button-secondary/app-button-secondary.component';
import { AppButtonPrimaryComponent } from '../../../dynamics/app-buttons/app-button-primary/app-button-primary.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroService } from '../../../../services/hero.service';
import { catchError, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal-confirm-delete.component',
  imports: [MatIcon, AppButtonSecondaryComponent, AppButtonPrimaryComponent],
  templateUrl: './app-modal-confirm-delete.component.html',
  styleUrl: './app-modal-confirm-delete.component.scss',
})
export class AppModalConfirmDeleteComponent {
  private readonly dialogRef = inject(MatDialogRef<AppModalConfirmDeleteComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroService = inject(HeroService);

  private readonly destroyRef = inject(DestroyRef);

  protected deleteHero(): void {
    this.heroService
      .deleteHero(this.dialogData.id)
      .pipe(
        tap(() => {
          this.dialogRef.close(1);
        }),
        catchError((err) => {
          this.dialogRef.close(2);
          console.error(
            'Error - app-modal-confirm-delete.component.ts - deleteHero() / ' + err.message,
          );
          return [];
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected closeConfirmDeleteModal(): void {
    this.dialogRef.close();
  }
}
