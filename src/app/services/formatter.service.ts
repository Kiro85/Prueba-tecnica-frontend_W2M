import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatterService {
  public firstCharToUpperCase(word: string | undefined): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public firstCharPerWordToUpperCase(word: string | undefined): string {
    if (!word) return '';
    return word
      .split(' ')
      .filter((w) => w.length > 0)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase())
      .join(' ');
  }
}
