import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppButtonCreateFormComponent } from '../../../dynamics/app-buttons/app-button-create-form/app-button-create-form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HeroeService } from '../../../../services/heroe.service';
import { Heroe, HeroeRequest } from '../../../../models/heroe';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-heroe-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    AppButtonCreateFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app-form-heroe-create.component.html',
  styleUrl: './app-form-heroe-create.component.scss',
})
export class AppFormHeroeCreateComponent implements OnInit, OnDestroy {
  protected createHeroeForm!: FormGroup;
  private loading = signal<boolean>(false);
  private error = signal<HttpErrorResponse | null>(null);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private readonly heroeService = inject(HeroeService);

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
    this.loading.set(false);
    this.error.set(null);

    this.heroeService.createHeroe(this.createHeroeModel()).subscribe({
      next: () => {
        window.location.reload();
        this.loading.set(false);
      },

      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        console.error('Error - app-form-heroe-create.component.ts - onSubmit() / ' + err.message);
      },
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
