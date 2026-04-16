import { Component, computed, effect, inject, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Hero } from '@models/hero';
import { Button } from '@interfaces/button';
import { HeroService } from '@services/hero.service';
import { HeroFormMapperService } from '@services/forms/hero-form-mapper.service';
import { HeroFormBuilderService } from '@services/forms/hero-form-builder.service';
import { AppButtonComponent } from '@components/dynamics/app-button/app-button.component';
import { AppFormFieldComponent } from '@components/statics/app-forms/app-form-field/app-form-field.component';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class AppFormHeroComponent {
  private readonly dialogRef = inject(MatDialogRef<AppFormHeroComponent>);
  protected readonly dialogData = inject(MAT_DIALOG_DATA);
  private readonly heroService = inject(HeroService);
  private readonly heroFormBuilder = inject(HeroFormBuilderService);
  private readonly heroFormMapper = inject(HeroFormMapperService);

  protected heroForm = this.heroFormBuilder.buildForm(this.dialogData?.hero);

  // -------
  // TODO: ENTENDER ESTO
  protected formStatus = toSignal(this.heroForm.statusChanges, {
    initialValue: this.heroForm.status,
  });

  protected submitButton = computed<Button>(() => ({
    content: this.dialogData ? 'Actualizar' : 'Crear',
    icon: this.dialogData ? 'edit' : 'add',
    customClass: 'primary',
    disabled: this.formStatus() === 'INVALID',
  }));
  // -------

  // -------
  // TODO: SE PUEDE QUITAR EL ASYNC/AWAIT Y SIMPLEMENTE USAR EL SUBSCRIBE?
  protected async onSubmit(): Promise<void> {
    const hero: Hero = await this.heroFormMapper.mapToHero(this.heroForm.value);
    hero.id ? this.updateHero(hero) : this.createHero(hero);
  }
  // -------

  private createHero(heroModel: Hero): void {
    this.heroService.createHero(heroModel).subscribe((success) => {
      this.dialogRef.close(success);
    });
  }

  private updateHero(hero: Hero): void {
    this.heroService.updateHero(hero).subscribe((success) => {
      this.dialogRef.close(success);
    });
  }

  // -------
  // TODO: SE PUEDE QUITAR?
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
  // -------
}
