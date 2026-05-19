export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'search';

export interface Button {
  content?: string;
  icon?: string;
  customClass?: ButtonVariant;
  disabled: boolean;
}
