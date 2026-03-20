import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppButtonCreateFormComponent } from '../../../dynamics/app-buttons/app-button-create-form/app-button-create-form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-heroe-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonCreateFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app-form-heroe-create.component.html',
  styleUrl: './app-form-heroe-create.component.scss',
})
export class AppFormHeroeCreateComponent implements OnInit, OnDestroy {
  protected createHeroeForm!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy(): void {

  }

  private initForm(): void {
    this.createHeroeForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      superpower: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(12), Validators.maxLength(128)]),
      image: new FormControl(null, [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    })
  }

  protected onSubmit(): void {
    console.log(this.createHeroeForm.value)
  }
}
