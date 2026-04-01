import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionCardsComponent } from './section-cards.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { HeroStoreService } from '../../services/hero-store.service';
import { signal } from '@angular/core';
import { Hero } from '../../models/hero';

describe('SectionCardsComponent', () => {
  let fixture: ComponentFixture<SectionCardsComponent>;
  let component: SectionCardsComponent;

  const mockHeroStoreService = {
    heroesFiltered: signal<Hero[] | null>(null),
    heroes: signal<Hero[] | null>(null),
    page: signal<number>(0),
    nextPage: signal<boolean>(true),
    loading: signal<boolean>(false),
    error: signal<string | null>(null),
    getHeroesPaginated: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCardsComponent],
      providers: [{ provide: HeroStoreService, useValue: mockHeroStoreService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextPage on init', () => {
    component.ngOnInit();

    expect(mockHeroStoreService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should call getHeroesPaginated if morePages is true', () => {
    component['nextPage']();

    expect(mockHeroStoreService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should NOT call getHeroesPaginated if morePages is false', () => {
    mockHeroStoreService.nextPage.set(false);
    mockHeroStoreService.getHeroesPaginated.mockClear();

    component['nextPage']();

    expect(mockHeroStoreService.getHeroesPaginated).not.toHaveBeenCalled();
  });

  it('should expose heroes and state from service', () => {
    expect(component['heroes']).toBe(mockHeroStoreService.heroes);
    expect(component['heroesFiltered']).toBe(mockHeroStoreService.heroesFiltered);
    expect(component['nextPage']).toBe(mockHeroStoreService.nextPage);
    expect(component['loading']).toBe(mockHeroStoreService.loading);
    expect(component['error']).toBe(mockHeroStoreService.error);
  });
});
