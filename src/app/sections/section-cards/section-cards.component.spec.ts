import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionCardsComponent } from './section-cards.component';

import { signal } from '@angular/core';

import { describe, it, expect, beforeEach, vi } from 'vitest'

import { Hero } from '@models/hero';
import { HeroService } from '@services/hero.service';

describe('SectionCardsComponent', () => {
  let fixture: ComponentFixture<SectionCardsComponent>;
  let component: SectionCardsComponent;

  const mockHeroService = {
    getHeroesPaginated: vi.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCardsComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroesPaginated on init', () => {
    component.ngOnInit();

    expect(mockHeroService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should call getHeroesPaginated if morePages is true', () => {
    component.nextPage.set(true);
    component['nextPage']();

    expect(mockHeroService.getHeroesPaginated).toHaveBeenCalled();
  });

  it('should NOT call getHeroesPaginated if morePages is false', () => {
    component.nextPage.set(false);
    component['nextPage']();

    expect(mockHeroService.getHeroesPaginated).not.toHaveBeenCalled();
  });
});
