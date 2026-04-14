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
  public placeholder = input<string>('');
  public label = input<string>('');

  protected getErrorMessage(control: FormControl | null): string {
    let message: string = '';

    if (control && control.touched && control.errors) {
      const errorMessages: Record<string, () => string> = {
        required: () => 'Este campo es obligatorio.',
        minlength: () => `Mínimo ${control.errors!['minlength'].requiredLength} caracteres`,
        maxlength: () => `Máximo ${control.errors!['maxlength'].requiredLength} caracteres`,
        requiredTrue: () => 'Debes aceptar los términos',
      };

      const error = Object.keys(control.errors)[0];
      message = errorMessages[error]?.();
    }

    return message;
  }

  protected onFileSelected(control: FormControl, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      control.setValue(file);
    }
  }
}
