import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModalDeleteComponent } from './app-modal-delete.component';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeroService } from '@services/hero.service';

describe('AppModalDeleteComponent', () => {
  let fixture: ComponentFixture<AppModalDeleteComponent>;
  let component: AppModalDeleteComponent;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHeroService = {
    deleteHero: vi.fn(() => of({})),
  };

  const mockDialogData = {
    id: 1,
    name: 'batman',
    superpower: 'intelligence',
    city: 'gotham',
    description: 'dark knight hero',
    image: 'base64',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: HeroService, useValue: mockHeroService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteHero and close dialog with true on success', () => {
    component['deleteHero']();

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(mockDialogData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call deleteHero and close dialog with false on error', () => {
    mockHeroService.deleteHero.mockReturnValue(throwError(() => new Error()));

    component['deleteHero']();

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(mockDialogData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close modal without action', () => {
    component['closeDeleteModal']();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
