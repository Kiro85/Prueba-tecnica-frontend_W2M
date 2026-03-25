import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppSearchBarComponent } from './app-search-bar.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroStoreService } from '../../../services/hero-store.service';

describe('AppSearchBarComponent', () => {
  let fixture: ComponentFixture<AppSearchBarComponent>;
  let component: AppSearchBarComponent;

  const mockHeroStoreService = {
    getHeroesByName: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchBarComponent, ReactiveFormsModule],
      providers: [{ provide: HeroStoreService, useValue: mockHeroStoreService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroesByName when input changes', async () => {
    component['query'].setValue('batman');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroStoreService.getHeroesByName).toHaveBeenCalledWith('batman');
  });

  it('should trim query before calling service', async () => {
    component['query'].setValue('   superman   ');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroStoreService.getHeroesByName).toHaveBeenCalledWith('superman');
  });

  it('should send null if query is empty', async () => {
    component['query'].setValue('   ');

    await new Promise((r) => setTimeout(r, 300));

    expect(mockHeroStoreService.getHeroesByName).toHaveBeenCalledWith(null);
  });

  it('should cleanup on destroy', () => {
    const nextSpy = vi.spyOn(component['destroy$'], 'next');
    const completeSpy = vi.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
