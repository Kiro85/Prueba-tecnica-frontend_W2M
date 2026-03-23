import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AppFormHeroCreateComponent } from '../../../statics/app-forms/app-form-hero-create/app-form-hero-create.component';

@Component({
  selector: 'app-button-create',
  imports: [MatIcon],
  templateUrl: './app-button-create.component.html',
  styleUrl: './app-button-create.component.scss',
})
export class AppButtonCreateComponent {
  private readonly dialog: MatDialog = new MatDialog();

  OpenCreateHeroeForm(): void {
    const dialogRef = this.dialog.open(AppFormHeroCreateComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert('Heroe creado correctamente!')
      } else {
        alert("Error al crear el héroe")
      }
    })
  }
}
