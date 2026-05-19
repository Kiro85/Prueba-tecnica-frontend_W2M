import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroSearchService {
  private readonly searchSubject = new BehaviorSubject<string>('');
  public search$ = this.searchSubject.asObservable();

  public search(q: string): void {
    this.searchSubject.next(q);
  }
}
