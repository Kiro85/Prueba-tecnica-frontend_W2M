import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { AppMessageComponent } from '@components/dynamics/app-messages/app-message/app-message.component';

@Component({
  selector: 'app-message-snackbar',
  imports: [AppMessageComponent],
  template: `
    <app-message [success]="data.success">
      {{ data.message }}
    </app-message>
  `,
})
export class AppMessageSnackbarComponent {
  readonly data = inject(MAT_SNACK_BAR_DATA);
}
