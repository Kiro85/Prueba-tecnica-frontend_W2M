import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroStoreService } from '../hero-store.service';
import { HeroService } from '../hero.service';
import { firstValueFrom, of, throwError } from 'rxjs';
import { Hero, HeroRequest } from '../../models/hero';

describe('HeroStoreService', () => {
  let service: HeroStoreService;

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

  let heroServiceMock = {
    getHeroes: vi.fn(() => of(mockHeroes)),
    getHeroesPaginated: vi.fn(() => of(mockPage)),
    getHeroesByName: vi.fn(() => of(mockHeroes)),
    createHeroe: vi.fn(() => of(mockHero)),
    deleteHeroe: vi.fn(() => of(mockHero)),
    updateHeroe: vi.fn(() => of(mockHero)),
  };

  beforeEach(() => {
    heroServiceMock = {
      getHeroes: vi.fn(() => of(mockHeroes)),
      getHeroesPaginated: vi.fn(() => of(mockPage)),
      getHeroesByName: vi.fn(() => of(mockHeroes)),
      createHeroe: vi.fn(() => of(mockHero)),
      deleteHeroe: vi.fn(() => of(mockHero)),
      updateHeroe: vi.fn(() => of(mockHero)),
    };

    TestBed.configureTestingModule({
      providers: [HeroStoreService, { provide: HeroService, useValue: heroServiceMock }],
    });

    service = TestBed.inject(HeroStoreService);
  });

  it('should paginate heroes', () => {
    service.getHeroesPaginated(1, 8);

    expect(service.heroes()?.length).toBe(1);
    expect(service.page()).toBe(1);
    expect(service.nextPage()).toBe(true);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should filter heroes by name', () => {
    service.getHeroesByName('Batman');

    expect(service.heroesFiltered()).toEqual(mockHeroes);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should set filtered heroes to null when name is null', () => {
    service.getHeroesByName(null);

    expect(service.heroesFiltered()).toBeNull();
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should create hero', () => {
    service.createHeroe(heroRequest).subscribe();

    expect(service.heroes()?.includes(mockHero)).toBe(true);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should delete hero', () => {
    service.deleteHeroe(mockHero).subscribe();

    expect(service.heroes()).toEqual([]);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should update hero', async () => {
    service.heroes.set([mockHero]);

    await firstValueFrom(service.updateHeroe(mockHero));

    expect(service.heroes()).toEqual([mockHero]);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
  });

  it('should handle error when loading heroes', () => {
    const error = new Error('fail');

    heroServiceMock.getHeroes.mockReturnValue(throwError(() => error));

    service.getHeroes();

    expect(service.loading()).toBe(false);
    expect(service.error()).toBe(error);
  });
});
