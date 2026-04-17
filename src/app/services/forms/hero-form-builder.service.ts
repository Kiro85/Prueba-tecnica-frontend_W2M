import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { Hero } from '@models/hero';
import { FormHero } from '@interfaces/form-hero';
import { HeroFormValidatorsService } from '@services/forms/hero-form-validators.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFormBuilderService {
  private fb = inject(NonNullableFormBuilder);
  private heroFormValidators = inject(HeroFormValidatorsService);

  public buildForm(hero?: Hero): FormGroup<FormHero> {
    return this.fb.group({
      id: [hero?.id || ''],
      name: [hero?.name.toUpperCase() || '', this.heroFormValidators.name()],
      superpower: [hero?.superpower.toUpperCase() || '', this.heroFormValidators.superpower()],
      city: [hero?.city.toUpperCase() || '', this.heroFormValidators.city()],
      description: [hero?.description.toUpperCase() || '', this.heroFormValidators.description()],
      image: [hero?.image || '', this.heroFormValidators.image()],
      termsAndConditions: [false, this.heroFormValidators.termsAndConditions()],
    });
  }
}
