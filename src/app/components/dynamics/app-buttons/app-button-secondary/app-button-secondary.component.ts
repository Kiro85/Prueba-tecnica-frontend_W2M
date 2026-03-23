import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  imports: [],
  templateUrl: './app-button-secondary.component.html',
  styleUrl: './app-button-secondary.component.scss',
})
export class AppButtonSecondaryComponent {
  @Input() message!: string;
}
