import { Component, DestroyRef, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroService } from '../../../../services/hero.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppButtonComponent } from '../../app-button/app-button.component';

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

  private readonly destroyRef = inject(DestroyRef);

  protected deleteHero(): void {
    this.heroService
      .deleteHero(this.dialogData.hero().id)
      .pipe(
        tap(() => {
          this.dialogRef.close(1);
        }),
        catchError(() => {
          this.dialogRef.close(2);
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
