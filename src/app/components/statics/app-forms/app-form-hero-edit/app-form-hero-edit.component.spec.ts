import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFormHeroEditComponent } from './app-form-hero-edit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { HeroStoreService } from '../../../../services/hero-store.service';
import { ImageService } from '../../../../services/image.service';
import { FormatterService } from '../../../../services/formatter.service';

describe('AppFormHeroEditComponent (Vitest)', () => {
  let component: AppFormHeroEditComponent;
  let fixture: ComponentFixture<AppFormHeroEditComponent>;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHeroStoreService = {
    updateHeroe: vi.fn(() => of({})),
  };

  const mockImageService = {
    convertFileToBase64: vi.fn().mockResolvedValue('convertedBase64'),
  };

  const mockFormatterService = {
    firstCharPerWordToUpperCase: vi.fn((v) => v),
    firstCharToUpperCase: vi.fn((v) => v),
  };

  const mockDialogData = {
    id: 1,
    name: 'batman',
    superpower: 'intelligence',
    city: 'gotham',
    description: 'dark knight hero',
    image: 'base64string',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormHeroEditComponent, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: HeroStoreService, useValue: mockHeroStoreService },
        { provide: ImageService, useValue: mockImageService },
        { provide: FormatterService, useValue: mockFormatterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFormHeroEditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with dialog data', () => {
    const form = component['editHeroForm'];

    expect(form.value.name).toBe('BATMAN');
    expect(form.value.superpower).toBe('intelligence');
    expect(form.value.city).toBe('gotham');
    expect(form.value.description).toBe('dark knight hero');
    expect(form.value.image).toBe('base64string');
  });

  it('should be invalid when required fields are empty', () => {
    component['editHeroForm'].patchValue({
      name: '',
      superpower: '',
      city: '',
      description: '',
      image: null,
      termsAndConditions: false,
    });

    expect(component['editHeroForm'].valid).toBe(false);
  });

  it('should call updateHeroe and close dialog with 1 on success', async () => {
    await component['onSubmit']();

    expect(mockHeroStoreService.updateHeroe).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 2 on error', async () => {
    mockHeroStoreService.updateHeroe.mockReturnValue(throwError(() => new Error('error')));

    await component['onSubmit']();

    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should use base64 string if image is string', async () => {
    const result = await component['createHeroeModel']();

    expect(result.image).toBe('base64string');
    expect(mockImageService.convertFileToBase64).not.toHaveBeenCalled();
  });

  it('should convert file to base64 if image is File', async () => {
    const file = new File(['data'], 'file.png', { type: 'image/png' });
    component['editHeroForm'].patchValue({ image: file });

    const result = await component['createHeroeModel']();

    expect(mockImageService.convertFileToBase64).toHaveBeenCalledWith(file);
    expect(result.image).toBe('convertedBase64');
  });

  it('should set file when onFileSelected is triggered', () => {
    const file = new File(['data'], 'file.png');

    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component['onFileSelected'](event);

    expect(component['editHeroForm'].get('image')?.value).toBe(file);
  });

  it('should close modal', () => {
    component['closeModal']();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should cleanup on destroy', () => {
    const nextSpy = vi.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = vi.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
