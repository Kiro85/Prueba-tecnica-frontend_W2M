import { Component, DestroyRef, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, tap, throwError } from 'rxjs';

import { Button } from '@interfaces/button';
import { HeroService } from '@services/hero.service';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';

@Component({
  selector: 'app-modal-confirm-delete.component',
  imports: [MatIcon, AppButtonComponent],
  templateUrl: './app-modal-confirm-delete.component.html',
  styleUrl: './app-modal-confirm-delete.component.scss',
})
export class AppModalConfirmDeleteComponent {
  private readonly dialogRef = inject(MatDialogRef<AppModalConfirmDeleteComponent>);
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

  private readonly destroyRef = inject(DestroyRef);

  protected deleteHero(): void {
    this.heroService
      .deleteHero(this.dialogData.hero.id)
      .pipe(
        tap(() => {
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.dialogRef.close(false);
          return throwError(() => err);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected closeConfirmDeleteModal(): void {
    this.dialogRef.close();
  }
}
