import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { Hero, HeroRequest } from '../../../../models/hero';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppButtonPrimaryFormComponent } from '../../../dynamics/app-buttons/app-button-primary-form/app-button-primary-form.component';
import { ImageService } from '../../../../services/image.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppFormFieldComponent } from '../app-form-field/app-form-field.component';
import { HeroService } from '../../../../services/hero.service';

@Component({
  selector: 'app-form-hero',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonPrimaryFormComponent,
    ReactiveFormsModule,
    AppFormFieldComponent,
  ],
  templateUrl: './app-form-hero.component.html',
  styleUrl: './app-form-hero.component.scss',
})
export class AppFormHeroComponent implements OnInit {
  private readonly heroService = inject(HeroService);

  private readonly dialogRef = inject(MatDialogRef<AppFormHeroComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly imageService = inject(ImageService);

  protected createHeroForm!: FormGroup;
  private fb = inject(FormBuilder);
  protected formFields = [
    {
      name: 'name',
      label: 'Nombre',
      placeholder: 'Nombre',
      type: 'text',
    },
    {
      name: 'superpower',
      label: 'Superpoder',
      placeholder: 'Superpoder',
      type: 'text',
    },
    {
      name: 'city',
      label: 'Ciudad',
      placeholder: 'Ciudad',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Descripción',
      placeholder: 'Descripción',
      type: 'textarea',
    },
  ];

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.createHeroForm = this.fb.group({
      id: [this.dialogData?.hero.id || ''],
      name: [
        this.dialogData?.hero.name || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      ],
      superpower: [
        this.dialogData?.hero.superpower || '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      ],
      city: [
        this.dialogData?.hero.city || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      ],
      description: [
        this.dialogData?.hero.description || '',
        [Validators.required, Validators.minLength(12), Validators.maxLength(128)],
      ],
      image: [
        this.dialogData?.hero.image || '',
        [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    });
  }

  protected async onSubmit(): Promise<void> {
    if (!this.dialogData) {
      const heroModel = await this.createHeroModel(true);
      this.createHero(heroModel as Hero);
    } else {
      const heroRequestModel = await this.createHeroModel(false);
      this.updateHero(heroRequestModel as Hero);
    }
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

  private updateHero(hero: Hero): void {
    this.heroService
      .updateHero(hero)
      .pipe(
        tap(() => this.dialogRef.close(1)),
        catchError((err) => {
          this.dialogRef.close(2);
          console.error(
            'Error - app-form-hero-create.component.ts - updateHero() / ' + err.message,
          );
          return [];
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private async createHeroModel(isNew: boolean): Promise<HeroRequest | Hero> {
    const imageControl = this.createHeroForm.value.image;

    let base64: string;

    if (typeof imageControl === 'string') {
      base64 = imageControl;
    } else {
      base64 = await this.imageService.convertFileToBase64(imageControl);
    }
    if (isNew) {
      const request: HeroRequest = {
        name: this.createHeroForm.value.name,
        superpower: this.createHeroForm.value.superpower,
        city: this.createHeroForm.value.city,
        description: this.createHeroForm.value.description,
        image: base64,
      };
      return request;
    } else {
      const hero: Hero = {
        id: this.createHeroForm.value.id,
        name: this.createHeroForm.value.name,
        superpower: this.createHeroForm.value.superpower,
        city: this.createHeroForm.value.city,
        description: this.createHeroForm.value.description,
        image: base64,
      };
      return hero;
    }
  }

  protected closeModal(): void {
    this.dialogRef.close();
  }

  get nameControl(): FormControl {
    return this.createHeroForm.get('name') as FormControl;
  }

  get superpowerControl(): FormControl {
    return this.createHeroForm.get('superpower') as FormControl;
  }

  get cityControl(): FormControl {
    return this.createHeroForm.get('city') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.createHeroForm.get('description') as FormControl;
  }

  get imageControl(): FormControl {
    return this.createHeroForm.get('image') as FormControl;
  }
}
