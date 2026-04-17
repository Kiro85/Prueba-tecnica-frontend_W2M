import { inject, Injectable } from '@angular/core';

import { Hero } from '@models/hero';
import { ImageService } from '@services/image.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroFormMapperService {
  private readonly imageService = inject(ImageService);

  public mapToHero(formValue: any): Observable<Hero> {
    const image$ =
      typeof formValue.image === 'string'
        ? of(formValue.image)
        : this.imageService.convertFileToBase64(formValue.image);

    return image$.pipe(
      map(image => {
        const hero = {
          name: formValue.name,
          superpower: formValue.superpower,
          city: formValue.city,
          description: formValue.description,
          image,
        };

        return formValue.id
          ? { id: formValue.id, ...hero }
          : hero;
      })
    );
  }
}
