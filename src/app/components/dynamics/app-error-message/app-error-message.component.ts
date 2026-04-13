import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './app-error-message.component.html',
  styleUrl: './app-error-message.component.scss',
})
export class AppErrorMessageComponent {
  protected message = input('message');
}
