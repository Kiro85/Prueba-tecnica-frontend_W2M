import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { ImageService } from '../../../../services/image.service';
import { Subject } from 'rxjs';

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
export class AppFormHeroCreateComponent implements OnInit, OnDestroy {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroCreateComponent>);
  private readonly heroStoreService = inject(HeroStoreService);
  private readonly imageService = inject(ImageService);

  protected createHeroForm!: FormGroup;

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
        Validators.minLength(8),
        Validators.maxLength(64),
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

  protected async onSubmit(): Promise<void> {
    this.heroStoreService.createHeroe(await this.createHeroeModel()).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false),
    });
  }

  private async createHeroeModel(): Promise<HeroRequest> {
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.createHeroForm.get('image')!.setValue(file);
  }
}
