import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroRequest } from '../../../../models/hero';
import { HeroStoreService } from '../../../../services/hero-store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AppButtonPrimaryFormComponent } from '../../../dynamics/app-buttons/app-button-primary-form/app-button-primary-form.component';

@Component({
  selector: 'app-form-hero-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonPrimaryFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app-form-hero-create.component.html',
  styleUrl: './app-form-hero-create.component.scss',
})
export class AppFormHeroCreateComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroCreateComponent>);
  protected createHeroForm!: FormGroup;
  private readonly heroStoreService = inject(HeroStoreService);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.createHeroForm = new FormGroup({
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
    this.heroStoreService.createHeroe(this.createHeroeModel()).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }

  private createHeroeModel(): HeroRequest {
    const request: HeroRequest = {
      name: this.createHeroForm.value.name,
      superpower: this.createHeroForm.value.superpower,
      city: this.createHeroForm.value.city,
      description: this.createHeroForm.value.description,
      image: this.createHeroForm.value.image,
    };

    return request;
  }
}
