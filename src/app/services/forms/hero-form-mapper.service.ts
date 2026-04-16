import { inject, Injectable } from '@angular/core';

import { Hero } from '@models/hero';
import { ImageService } from '@services/image.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFormMapperService {
  private readonly imageService = inject(ImageService);

  public async mapToHero(formValue: any): Promise<Hero> {
    const image =
      typeof formValue.image === 'string'
        ? formValue.image
        : await this.imageService.convertFileToBase64(formValue.image);

    const hero: Hero = {
      id: formValue.id,
      name: formValue.name,
      superpower: formValue.superpower,
      city: formValue.city,
      description: formValue.description,
      image,
    };

    return hero;
  }
}
