import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-create-form',
  imports: [],
  templateUrl: './app-button-create-form.component.html',
  styleUrl: './app-button-create-form.component.scss',
})
export class AppButtonCreateFormComponent {
  @Input() disabled: boolean = false;
}
