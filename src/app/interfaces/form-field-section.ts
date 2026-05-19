import { FormField } from "@interfaces/form-field";

export interface FormFieldSection {
  layout: 'row-2' | 'row-1';
  fields: FormField[];
}
