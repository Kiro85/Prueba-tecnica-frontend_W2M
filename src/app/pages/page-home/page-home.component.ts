import { Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { tap } from 'rxjs';

import { Button } from '@interfaces/button';
import { SectionCardsComponent } from '@sections/section-cards/section-cards.component';
import { AppMessageSnackbarComponent } from '@components/dynamics/app-messages/app-message-snackbar/app-message-snackbar.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppSearchBarComponent } from '@components/statics/app-search-bar/app-search-bar.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';

@Component({
  selector: 'page-home',
  imports: [
    SectionCardsComponent,
    AppSearchBarComponent,
    AppButtonComponent,
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.scss',
})
export class PageHomeComponent {
  protected query = signal<string>('');
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  @ViewChild(SectionCardsComponent) private readonly sectionCards?: SectionCardsComponent;

  protected createButton: Button = {
    content: 'Crear nuevo héroe',
    icon: 'add',
    customClass: 'primary',
    disabled: false,
  };

  private readonly destroyRef = inject(DestroyRef);

  protected openCreateHeroForm(): void {
    const dialogRef = this.dialog.open(AppFormHeroComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((success) => {
          if (success === true) {
            this.showSnackbar('Héroe creado con éxito', true);
            this.sectionCards?.refresh();

          } else if (success === false) {
            this.showSnackbar('Ha ocurrido un error', false);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
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
