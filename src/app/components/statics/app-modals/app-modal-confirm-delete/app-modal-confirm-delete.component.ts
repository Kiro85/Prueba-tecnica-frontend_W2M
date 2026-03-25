import { Component, inject, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppButtonSecondaryComponent } from '../../../dynamics/app-buttons/app-button-secondary/app-button-secondary.component';
import { AppButtonPrimaryComponent } from '../../../dynamics/app-buttons/app-button-primary/app-button-primary.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroStoreService } from '../../../../services/hero-store.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirm-delete.component',
  imports: [MatIcon, AppButtonSecondaryComponent, AppButtonPrimaryComponent],
  templateUrl: './app-modal-confirm-delete.component.html',
  styleUrl: './app-modal-confirm-delete.component.scss',
})
export class AppModalConfirmDeleteComponent implements OnDestroy {
  private readonly dialogRef = inject(MatDialogRef<AppModalConfirmDeleteComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroStoreService = inject(HeroStoreService);

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected DeleteHeroe(): void {
    this.heroStoreService.deleteHeroe(this.dialogData).subscribe({
      next: () => this.dialogRef.close(1),
      error: () => this.dialogRef.close(2),
    });
  }

  protected CloseConfirmDeleteModal(): void {
    this.dialogRef.close();
  }
}
