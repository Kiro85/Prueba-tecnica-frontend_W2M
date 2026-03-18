import { Component } from '@angular/core';
import { AppButtonEdit } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { AppButtonDelete } from '../../app-buttons/app-button-delete/app-button-delete.component';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEdit, AppButtonDelete],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {

}
