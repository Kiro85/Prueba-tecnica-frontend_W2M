import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { HeroService } from '../hero.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ErrorHandleService } from '../error-handle.service';
import { Hero, HeroRequest } from '../../models/hero';

describe('HeroService', () => {
  let httpMock: HttpTestingController;
  let service: HeroService;

  const mockErrorHandleService = {
    handleError: vi.fn((error: any) => {
      throw error;
    }),
  };

  const mockHero: Hero = {
    id: '1',
    name: 'batman',
    superpower: 'intelligence',
    city: 'gotham',
    description: 'dark knight hero',
    image: 'base64',
  };

  const mockHeroes = [mockHero];

  const mockPage = {
    data: mockHeroes,
    items: 11,
    first: 1,
    last: 8,
    pages: 2,
    next: 9,
    prev: 7,
  };

  const heroRequest: HeroRequest = {
    name: 'batman',
    superpower: 'intelligence',
    city: 'gotham',
    description: 'dark knight hero',
    image: 'base64',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ErrorHandleService, useValue: mockErrorHandleService },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get heroes', () => {
    service.getHeroes().subscribe((res) => {
      expect(res).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('GET');

    req.flush(mockHeroes);
  });

  it('should get heroes paginated', () => {
    service.getHeroesPaginated(1, 8).subscribe((res) => {
      expect(res).toEqual(mockPage);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes?_page=1&_per_page=8');

    expect(req.request.method).toBe('GET');

    req.flush(mockPage);
  });

  it('should get heroes by name', () => {
    service.getHeroesByName('Batman').subscribe((res) => {
      expect(res).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes?name:contains=Batman');
    expect(req.request.method).toBe('GET');

    req.flush(mockHeroes);
  });

  it('should create hero', () => {
    service.createHeroe(heroRequest).subscribe((res) => {
      expect(res).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(heroRequest);

    req.flush(mockHero);
  });

  it('should delete hero', () => {
    service.deleteHeroe(mockHero.id).subscribe((res) => {
      expect(res).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1');

    expect(req.request.method).toBe('DELETE');

    req.flush(mockHero);
  });

  it('should update hero', () => {
    service.updateHeroe(mockHero).subscribe((res) => {
      expect(res).toEqual(mockHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes/1');

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockHero);

    req.flush(mockHero);
  });
});
