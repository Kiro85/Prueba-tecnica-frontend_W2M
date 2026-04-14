import { Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { tap } from 'rxjs';

import { SectionCardsComponent } from '@sections/section-cards/section-cards.component';
import { AppModalMessageComponent } from '@components/dynamics/app-modals/app-modal-message/app-modal-message.component';
import { AppSearchBarComponent } from '@components/statics/app-search-bar/app-search-bar.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';

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
