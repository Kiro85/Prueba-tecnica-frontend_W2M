import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AppFormHeroCreateComponent } from '../../../statics/app-forms/app-form-hero-create/app-form-hero-create.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-button-create',
  imports: [MatIcon],
  templateUrl: './app-button-create.component.html',
  styleUrl: './app-button-create.component.scss',
})
export class AppButtonCreateComponent implements OnDestroy {
  private readonly dialog: MatDialog = new MatDialog();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  OpenCreateHeroeForm(): void {
    const dialogRef = this.dialog.open(AppFormHeroCreateComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('Heroe creado correctamente!');
      } else {
        alert('Error al crear el héroe');
      }
    });
  }
}
