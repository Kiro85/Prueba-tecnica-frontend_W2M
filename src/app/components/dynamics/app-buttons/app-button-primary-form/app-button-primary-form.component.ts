import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-primary-form',
  imports: [],
  templateUrl: './app-button-primary-form.component.html',
  styleUrl: './app-button-primary-form.component.scss',
})
export class AppButtonPrimaryFormComponent {
  @Input() message!: string;
  @Input() disabled: boolean = false;
}
