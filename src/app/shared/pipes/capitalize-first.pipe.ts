import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstPipe',
})
export class CapitalizeFirstPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';
  }
}
