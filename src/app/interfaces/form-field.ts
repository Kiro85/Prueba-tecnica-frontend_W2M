import { FormControl } from "@angular/forms";

type FormFieldType = 'text' | 'textarea' | 'img';

export interface FormField {
  control: FormControl;
  type: FormFieldType;
  label: string;
  placeholder?: string;
}
