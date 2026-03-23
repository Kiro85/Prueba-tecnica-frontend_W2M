import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppButtonSecondaryComponent } from "../../../dynamics/app-buttons/app-button-secondary/app-button-secondary.component";
import { AppButtonPrimaryComponent } from "../../../dynamics/app-buttons/app-button-primary/app-button-primary.component";

@Component({
  selector: 'app-modal-confirm-delete.component',
  imports: [MatIcon, AppButtonSecondaryComponent, AppButtonPrimaryComponent],
  templateUrl: './app-modal-confirm-delete.component.html',
  styleUrl: './app-modal-confirm-delete.component.scss',
})
export class AppModalConfirmDeleteComponent {

}
