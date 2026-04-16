import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HeroFormValidatorsService {
  private text(min: number, max: number): any {
    return [Validators.required, Validators.minLength(min), Validators.maxLength(max)];
  }

  public name(): any {
    return this.text(3, 32);
  }

  public superpower(): any {
    return this.text(8, 64);
  }

  public city(): any {
    return this.text(3, 32);
  }

  public description(): any {
    return this.text(12, 128);
  }

  public image(): any {
    return [Validators.required];
  }

  public termsAndConditions(): any {
    return [Validators.required];
  }
}
