import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroeRequest } from '../../../../models/heroe';
import { HeroeStoreService } from '../../../../services/heroe-store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AppButtonPrimaryFormComponent } from '../../../dynamics/app-buttons/app-button-primary-form/app-button-primary-form.component';

@Component({
  selector: 'app-form-heroe-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonPrimaryFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app-form-heroe-create.component.html',
  styleUrl: './app-form-heroe-create.component.scss',
})
export class AppFormHeroeCreateComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroeCreateComponent>);
  protected createHeroeForm!: FormGroup;
  private readonly heroeStoreService = inject(HeroeStoreService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.createHeroeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      superpower: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(128),
      ]),
      image: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  protected onSubmit(): void {
    this.heroeStoreService.createHeroe(this.createHeroeModel()).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }

  private createHeroeModel(): HeroeRequest {
    const request: HeroeRequest = {
      name: this.createHeroeForm.value.name,
      superpower: this.createHeroeForm.value.superpower,
      city: this.createHeroeForm.value.city,
      description: this.createHeroeForm.value.description,
      image: this.createHeroeForm.value.image,
    };

    return request;
  }
}
