import { FormControl } from "@angular/forms";

export interface FormHero {
  id: FormControl<string>;
  name: FormControl<string>;
  superpower: FormControl<string>;
  city: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<File | string>;
  termsAndConditions: FormControl<boolean>;
}
