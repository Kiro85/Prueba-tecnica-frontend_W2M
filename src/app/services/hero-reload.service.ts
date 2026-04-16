import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroReloadService {
  private readonly reloadSubject = new Subject<void>();
  public reload$ = this.reloadSubject.asObservable();

  public triggerReload(): void {
    this.reloadSubject.next();
  }
}
