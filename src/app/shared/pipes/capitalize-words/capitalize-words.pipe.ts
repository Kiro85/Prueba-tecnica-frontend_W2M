import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWordsPipe',
})
export class CapitalizeWordsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value
      ? value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(' ')
      : '';
  }
}
