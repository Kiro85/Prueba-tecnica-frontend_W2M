import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormHero } from '@interfaces/form-hero';
import { FormFieldSection } from '@interfaces/form-field-section';

@Injectable({
  providedIn: 'root',
})
export class HeroFormFieldsBuilderService {
  public buildFields(heroForm: FormGroup<FormHero>): FormFieldSection[] {
    return [
      {
        layout: 'row-2',
        fields: [
          {
            control: heroForm.controls.name,
            type: 'text',
            label: 'Nombre',
            placeholder: 'Nombre',
          },
          {
            control: heroForm.controls.superpower,
            type: 'text',
            label: 'Superpoder',
            placeholder: 'Superpoder',
          },
        ],
      },
      {
        layout: 'row-1',
        fields: [
          {
            control: heroForm.controls.city,
            type: 'text',
            label: 'Ciudad',
            placeholder: 'Ciudad',
          },
        ],
      },
      {
        layout: 'row-1',
        fields: [
          {
            control: heroForm.controls.description,
            type: 'textarea',
            label: 'Descripción',
            placeholder: 'Descripción',
          },
        ],
      },
      {
        layout: 'row-1',
        fields: [
          {
            control: heroForm.controls.image,
            type: 'img',
            label: 'Elige una imagen',
          },
        ],
      },
    ];
  }
}
