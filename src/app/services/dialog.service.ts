import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero } from '@models/hero';
import { HeroReloadService } from '@services/hero-reload.service';
import { AppModalMessageComponent } from '@components/dynamics/app-modals/app-modal-message/app-modal-message.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly heroReloadService = inject(HeroReloadService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  public openDialog(
    component: ComponentType<unknown>,
    successMessage: string,
    errorMessage: string,
    hero?: Hero,
  ): void {
    this.dialog
      .open(component, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: { hero: hero },
      })
      .afterClosed()
      .subscribe((success) => {
        this.showSnackbar(success ? successMessage : errorMessage, success);
        success ? this.heroReloadService.triggerReload() : '';
      });
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
