import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero } from '@models/hero';
import { HeroReloadService } from '@services/hero-reload.service';
import { AppMessageSnackbarComponent } from '@components/dynamics/app-messages/app-message-snackbar/app-message-snackbar.component';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly heroReloadService = inject(HeroReloadService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  public openDialog(
    component: ComponentType<any>,
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
        if (success !== undefined) {
          this.showSnackbar(success ? successMessage : errorMessage, success);
          success ? this.heroReloadService.triggerReload() : '';
        }
      });
  }

  private showSnackbar(message: string, success: boolean): void {
    this.snackBar.openFromComponent(AppMessageSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'top',
      data: {
        message,
        success,
      },
    });
  }
}
