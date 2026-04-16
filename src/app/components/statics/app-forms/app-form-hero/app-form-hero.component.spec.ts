import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFormHeroComponent } from './app-form-hero.component';

import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { ImageService } from '@services/image.service';

describe('AppFormHeroComponent', () => {
  let fixture: ComponentFixture<AppFormHeroComponent>;
  let component: AppFormHeroComponent;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHeroService = {
    createHero: vi.fn(() => of({})),
  };

  const mockImageService = {
    convertFileToBase64: vi.fn(() => Promise.resolve('base64')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormHeroComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ImageService, useValue: mockImageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFormHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component['heroForm']).toBeTruthy();
  });

  it('should call createHero and close dialog with true on success', async () => {
    const file = new File(['data'], 'file.png');

    component['heroForm'].patchValue({
      name: 'batman',
      superpower: 'intelligence123',
      city: 'gotham',
      description: 'dark knight hero text',
      image: file,
      termsAndConditions: true,
    });

    await component['onSubmit']();

    expect(mockHeroService.createHero).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false on error', async () => {
    mockHeroService.createHero.mockReturnValue(throwError(() => new Error()));

    const file = new File(['data'], 'file.png');

    component['heroForm'].patchValue({
      name: 'batman',
      superpower: 'intelligence123',
      city: 'gotham',
      description: 'dark knight hero text',
      image: file,
      termsAndConditions: true,
    });

    await component['onSubmit']();

    expect(mockHeroService.createHero).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should be invalid when required fields are empty', () => {
    component['heroForm'].patchValue({
      name: '',
      superpower: '',
      city: '',
      description: '',
      image: null,
      termsAndConditions: false,
    });

    expect(component['heroForm'].valid).toBe(false);
  });

  it('should convert file to base64', async () => {
    const file = new File(['data'], 'file.png', { type: 'image/png' });
    component['heroForm'].patchValue({ image: file });

    const result = await component['createHeroModel'](false);

    expect(mockImageService.convertFileToBase64).toHaveBeenCalledWith(file);
    expect(result.image).toBe('base64');
  });

  it('should close modal', () => {
    component['closeModal']();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
