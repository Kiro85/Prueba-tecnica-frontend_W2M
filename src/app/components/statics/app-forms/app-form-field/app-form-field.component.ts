import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  imports: [MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app-form-field.component.html',
  styleUrl: './app-form-field.component.scss',
})
export class AppFormFieldComponent {
  public control = input<FormControl>(new FormControl());
  public type = input<'text' | 'textarea' | 'img'>();
  public placeholder = input('');
  public label = input('');

  protected getErrorMessage(control: FormControl | null): string {
    let message: string = '';

    if (control && control.touched && control.errors) {
      if (control.errors['required'])
        message = 'Este campo es obligatorio.';
      if (control.errors['minlength'])
        message = `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength'])
        message = `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      if (control.errors['requiredTrue']) message = 'Debes aceptar los términos';
    }

    return message;
  }

  protected onFileSelected(control: FormControl, event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    control.setValue(file);
  }
}
