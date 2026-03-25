import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppButtonPrimaryFormComponent } from '../../../dynamics/app-buttons/app-button-primary-form/app-button-primary-form.component';
import { HeroStoreService } from '../../../../services/hero-store.service';
import { Hero } from '../../../../models/hero';
import { ImageService } from '../../../../services/image.service';
import { Subject } from 'rxjs';
import { FormatterService } from '../../../../services/formatter.service';

@Component({
  selector: 'app-form-hero-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonPrimaryFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app-form-hero-edit.component.html',
  styleUrl: './app-form-hero-edit.component.scss',
})
export class AppFormHeroEditComponent implements OnInit, OnDestroy {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroEditComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroStoreService = inject(HeroStoreService);
  private readonly imageService = inject(ImageService);
  private readonly formatterService = inject(FormatterService);

  protected editHeroForm!: FormGroup;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initForm(): void {
    this.editHeroForm = new FormGroup({
      name: new FormControl(this.dialogData.name.toUpperCase(), [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      superpower: new FormControl(this.dialogData.superpower, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      city: new FormControl(this.dialogData.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      description: new FormControl(this.dialogData.description, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(128),
      ]),
      image: new FormControl(this.dialogData.image, [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  protected async onSubmit(): Promise<void> {
    this.heroStoreService.updateHeroe(await this.createHeroeModel()).subscribe({
      next: () => this.dialogRef.close(1),
      error: () => this.dialogRef.close(2),
    });
  }

  private async createHeroeModel(): Promise<Hero> {
    const imageControl = this.editHeroForm.value.image;

    let base64: string;

    if (typeof imageControl === 'string') {
      base64 = imageControl;
    }
    else {
      base64 = await this.imageService.convertFileToBase64(imageControl);
    }

    const request: Hero = {
      id: this.dialogData.id,
      name: this.formatterService.firstCharPerWordToUpperCase(this.editHeroForm.value.name),
      superpower: this.formatterService.firstCharToUpperCase(this.editHeroForm.value.superpower),
      city: this.formatterService.firstCharToUpperCase(this.editHeroForm.value.city),
      description: this.formatterService.firstCharToUpperCase(this.editHeroForm.value.description),
      image: base64,
    };

    return request;
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.editHeroForm.get('image')!.setValue(file);
  }

  protected closeModal(): void {
    this.dialogRef.close();
  }
}
