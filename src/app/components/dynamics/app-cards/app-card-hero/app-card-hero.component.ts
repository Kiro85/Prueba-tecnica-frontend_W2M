import { Component, Input } from '@angular/core';
import { AppButtonEditComponent } from '../../app-buttons/app-button-edit/app-button-edit.component';
import { AppButtonDeleteComponent } from '../../app-buttons/app-button-delete/app-button-delete.component';
import { Heroe } from '../../../../models/heroe';

@Component({
  selector: 'app-card-hero',
  imports: [AppButtonEditComponent, AppButtonDeleteComponent],
  templateUrl: './app-card-hero.component.html',
  styleUrl: './app-card-hero.component.scss',
})
export class AppCardHeroComponent {
  @Input() heroe?: Heroe;
}
