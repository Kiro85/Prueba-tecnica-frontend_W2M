import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroRequest } from '../../../../models/hero';
import { MatDialogRef } from '@angular/material/dialog';
import { AppButtonPrimaryFormComponent } from '../../../dynamics/app-buttons/app-button-primary-form/app-button-primary-form.component';
import { ImageService } from '../../../../services/image.service';
import { HeroStoreService } from '../../../../services/hero-store.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly heroService = inject(HeroStoreService);

  private readonly dialogRef = inject(MatDialogRef<AppFormHeroCreateComponent>);
  private readonly imageService = inject(ImageService);

  protected createHeroForm!: FormGroup;
  private fb = inject(FormBuilder);

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.createHeroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      superpower: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(128)]],
      image: [null, [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    });
  }

  protected async onSubmit(): Promise<void> {
    const heroModel = await this.createHeroModel();
    this.createHero(heroModel);
  }

  private createHero(heroModel: HeroRequest): void {
    this.heroService
      .createHero(heroModel)
      .pipe(
        tap(() => this.dialogRef.close(1)),
        catchError((err) => {
          this.dialogRef.close(2);
          console.error(
            'Error - app-form-hero-create.component.ts - createHero() / ' + err.message,
          );
          return [];
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private async createHeroModel(): Promise<HeroRequest> {
    const file: File = this.createHeroForm.value.image;

    const base64 = await this.imageService.convertFileToBase64(file);

    const request: HeroRequest = {
      name: this.createHeroForm.value.name,
      superpower: this.createHeroForm.value.superpower,
      city: this.createHeroForm.value.city,
      description: this.createHeroForm.value.description,
      image: base64,
    };

    return request;
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.createHeroForm.get('image')!.setValue(file);
  }

  protected closeModal(): void {
    this.dialogRef.close();
  }
}
