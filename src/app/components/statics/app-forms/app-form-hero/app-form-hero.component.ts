import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero, HeroRequest } from '../../../../models/hero';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../../../services/image.service';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppFormFieldComponent } from '../app-form-field/app-form-field.component';
import { HeroService } from '../../../../services/hero.service';
import { AppButtonComponent } from '../../../dynamics/app-button/app-button.component';

@Component({
  selector: 'app-form-hero',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonComponent,
    ReactiveFormsModule,
    AppFormFieldComponent,
  ],
  templateUrl: './app-form-hero.component.html',
  styleUrl: './app-form-hero.component.scss',
})
export class AppFormHeroComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroComponent>);
  protected readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly imageService = inject(ImageService);
  private readonly heroService = inject(HeroService);

  private fb = inject(FormBuilder);
  protected heroForm: any;

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.heroForm = this.fb.group({
      id: [this.dialogData?.hero().id || ''],
      name: [
        this.dialogData?.hero().name.toUpperCase() || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      ],
      superpower: [
        this.dialogData?.hero().superpower.toUpperCase() || '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(64)],
      ],
      city: [
        this.dialogData?.hero().city.toUpperCase() || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(32)],
      ],
      description: [
        this.dialogData?.hero().description.toUpperCase() || '',
        [Validators.required, Validators.minLength(12), Validators.maxLength(128)],
      ],
      image: [this.dialogData?.hero().image || '', [Validators.required]],
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
    const imageControl = this.heroForm.value.image;

    let base64: string;

    if (typeof imageControl === 'string') {
      base64 = imageControl;
    } else {
      base64 = await this.imageService.convertFileToBase64(imageControl);
    }
    if (isNew) {
      const request: HeroRequest = {
        name: this.heroForm.value.name,
        superpower: this.heroForm.value.superpower,
        city: this.heroForm.value.city,
        description: this.heroForm.value.description,
        image: base64,
      };
      return request;
    } else {
      const hero: Hero = {
        id: this.heroForm.value.id,
        name: this.heroForm.value.name,
        superpower: this.heroForm.value.superpower,
        city: this.heroForm.value.city,
        description: this.heroForm.value.description,
        image: base64,
      };
      return hero;
    }
  }

  protected closeModal(): void {
    this.dialogRef.close();
  }

  get nameControl(): FormControl {
    return this.heroForm.get('name') as FormControl;
  }

  get superpowerControl(): FormControl {
    return this.heroForm.get('superpower') as FormControl;
  }

  get cityControl(): FormControl {
    return this.heroForm.get('city') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.heroForm.get('description') as FormControl;
  }

  get imageControl(): FormControl {
    return this.heroForm.get('image') as FormControl;
  }
}
