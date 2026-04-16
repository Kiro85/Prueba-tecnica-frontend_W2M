import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSearchBarComponent } from './app-search-bar.component';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroService } from '@services/hero.service';


describe('AppSearchBarComponent', () => {
  let fixture: ComponentFixture<AppSearchBarComponent>;
  let component: AppSearchBarComponent;

  const mockHeroService = {
    getHeroesByName: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchBarComponent, ReactiveFormsModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit query when input changes', async () => {
    (component as any)['queryControl'].setValue('batman');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroService.getHeroesByName).toHaveBeenCalledWith('batman');
  });

  it('should trim query before calling service', async () => {
    (component as any)['queryControl'].setValue('   superman   ');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroService.getHeroesByName).toHaveBeenCalledWith('superman');
  });

  it('should send null if query is empty', async () => {
    (component as any)['queryControl'].setValue('   ');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroService.getHeroesByName).toHaveBeenCalledWith(null);
  });
});
