import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFormHeroCreateComponent } from './app-form-hero-create.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { HeroStoreService } from '../../../../services/hero-store.service';
import { ImageService } from '../../../../services/image.service';
import { FormatterService } from '../../../../services/formatter.service';

describe('AppFormHeroCreateComponent', () => {
  let fixture: ComponentFixture<AppFormHeroCreateComponent>;
  let component: AppFormHeroCreateComponent;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHeroStoreService = {
    createHeroe: vi.fn(() => of({})),
  };

  const mockImageService = {
    convertFileToBase64: vi.fn(() => Promise.resolve('base64')),
  };

  const mockFormatterService = {
    firstCharPerWordToUpperCase: vi.fn((v) => v),
    firstCharToUpperCase: vi.fn((v) => v),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormHeroCreateComponent, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: HeroStoreService, useValue: mockHeroStoreService },
        { provide: ImageService, useValue: mockImageService },
        { provide: FormatterService, useValue: mockFormatterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFormHeroCreateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component['createHeroForm']).toBeTruthy();
  });

  it('should call createHeroe and close dialog with 1 on success', async () => {
    const file = new File(['data'], 'file.png');

    component['createHeroForm'].patchValue({
      name: 'batman',
      superpower: 'intelligence123',
      city: 'gotham',
      description: 'dark knight hero text',
      image: file,
      termsAndConditions: true,
    });

    await component['onSubmit']();

    expect(mockHeroStoreService.createHeroe).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 2 on error', async () => {
    mockHeroStoreService.createHeroe.mockReturnValue(throwError(() => new Error()));

    const file = new File(['data'], 'file.png');

    component['createHeroForm'].patchValue({
      name: 'batman',
      superpower: 'intelligence123',
      city: 'gotham',
      description: 'dark knight hero text',
      image: file,
      termsAndConditions: true,
    });

    await component['onSubmit']();

    expect(mockHeroStoreService.createHeroe).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should be invalid when required fields are empty', () => {
    component['createHeroForm'].patchValue({
      name: '',
      superpower: '',
      city: '',
      description: '',
      image: null,
      termsAndConditions: false,
    });

    expect(component['createHeroForm'].valid).toBe(false);
  });

  it('should convert file to base64', async () => {
    const file = new File(['data'], 'file.png', { type: 'image/png' });
    component['createHeroForm'].patchValue({ image: file });

    const result = await component['createHeroeModel']();

    expect(mockImageService.convertFileToBase64).toHaveBeenCalledWith(file);
    expect(result.image).toBe('base64');
  });

  it('should set file when onFileSelected is triggered', () => {
    const file = new File(['data'], 'file.png');

    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component['onFileSelected'](event);

    expect(component['createHeroForm'].get('image')?.value).toBe(file);
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
