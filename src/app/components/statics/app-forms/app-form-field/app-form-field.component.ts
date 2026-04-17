import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { FormField } from '@interfaces/form-field';

@Component({
  selector: 'app-form-field',
  imports: [MatFormFieldModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app-form-field.component.html',
  styleUrl: './app-form-field.component.scss',
})
export class AppFormFieldComponent {
  public field = input<FormField>();

  protected getErrorMessage(control: FormControl): string {
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
