import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-error-message',
  imports: [MatIcon],
  templateUrl: './app-modal-error-message.component.html',
  styleUrl: './app-modal-error-message.component.scss',
})
export class AppModalErrorMessageComponent {
  protected readonly dialogData = inject(MAT_SNACK_BAR_DATA);
}
