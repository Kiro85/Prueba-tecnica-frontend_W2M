import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../models/heroe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  private readonly apiUrl = '/heroes';
  private http = inject(HttpClient);
}
