import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  imports: [],
  templateUrl: './app-button-primary.component.html',
  styleUrl: './app-button-primary.component.scss',
})
export class AppButtonPrimaryComponent {
  @Input() message!: string;
  @Input() disabled: boolean = false;
}
