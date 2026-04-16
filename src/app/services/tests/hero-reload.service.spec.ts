import { TestBed } from '@angular/core/testing';

import { HeroReloadService } from '../hero-reload.service';

describe('HeroReloadService', () => {
  let service: HeroReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
