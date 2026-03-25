import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-success-message',
  imports: [MatIcon],
  templateUrl: './app-modal-success-message.component.html',
  styleUrl: './app-modal-success-message.component.scss',
})
export class AppModalSuccessMessageComponent {
    protected readonly dialogData = inject(MAT_SNACK_BAR_DATA);
}
