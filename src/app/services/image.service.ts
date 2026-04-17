import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  convertFileToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
    });
  }
}
