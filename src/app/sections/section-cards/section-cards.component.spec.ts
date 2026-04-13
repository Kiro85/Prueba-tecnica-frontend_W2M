import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionCardsComponent } from './section-cards.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { signal } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

describe('SectionCardsComponent', () => {
  let fixture: ComponentFixture<SectionCardsComponent>;
  let component: SectionCardsComponent;

  const mockHeroService = {
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
      providers: [{ provide: HeroService, useValue: mockHeroService }],
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

    expect(mockHeroService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should call getHeroesPaginated if morePages is true', () => {
    component['nextPage']();

    expect(mockHeroService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should NOT call getHeroesPaginated if morePages is false', () => {
    mockHeroService.nextPage.set(false);
    mockHeroService.getHeroesPaginated.mockClear();

    component['nextPage']();

    expect(mockHeroService.getHeroesPaginated).not.toHaveBeenCalled();
  });

  it('should expose heroes and state from service', () => {
    expect(component['heroes']).toBe(mockHeroService.heroes);
    expect(component['heroesFiltered']).toBe(mockHeroService.heroesFiltered);
    expect(component['nextPage']).toBe(mockHeroService.nextPage);
    expect(component['loading']).toBe(mockHeroService.loading);
    expect(component['error']).toBe(mockHeroService.error);
  });
});
