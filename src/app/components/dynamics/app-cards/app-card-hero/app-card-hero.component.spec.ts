import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCardHeroComponent } from './app-card-hero.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormatterService } from '../../../../services/formatter.service';

import { AppModalConfirmDeleteComponent } from '../../../statics/app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { AppFormHeroEditComponent } from '../../../statics/app-forms/app-form-hero-edit/app-form-hero-edit.component';
import { AppModalSuccessMessageComponent } from '../../../statics/app-modals/app-modal-success-message/app-modal-success-message.component';
import { AppModalErrorMessageComponent } from '../../../statics/app-modals/app-modal-error-message/app-modal-error-message.component';

describe('AppCardHeroComponent', () => {
  let fixture: ComponentFixture<AppCardHeroComponent>;
  let component: AppCardHeroComponent;

  const mockDialogRef = {
    afterClosed: vi.fn(),
  };

  const mockDialog = {
    open: vi.fn(() => mockDialogRef),
  };

  const mockSnackBar = {
    openFromComponent: vi.fn(),
  };

  const mockFormatterService = {
    firstCharPerWordToUpperCase: vi.fn((v) => v),
    firstCharToUpperCase: vi.fn((v) => v),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardHeroComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: FormatterService, useValue: mockFormatterService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCardHeroComponent);
    component = fixture.componentInstance;

    // @Input
    component.hero = {
      id: '1',
      name: 'BATMAN',
      superpower: 'Intelligence',
      city: 'Gotham',
      description: 'Dark hero',
      image: 'img',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open delete dialog and show success snackbar when result is 1', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(1));

    component['OpenConfirmDeleteModal']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppModalConfirmDeleteComponent,
      expect.objectContaining({
        data: component.hero,
      }),
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalSuccessMessageComponent,
      expect.any(Object),
    );
  });

  it('should open delete dialog and show error snackbar when delete result is 2', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(2));

    component['OpenConfirmDeleteModal']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppModalConfirmDeleteComponent,
      expect.objectContaining({
        data: component.hero,
      }),
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalErrorMessageComponent,
      expect.any(Object),
    );
  });

  it('should open edit dialog and show success snackbar when result is 1', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(1));

    component['OpenFormHeroeEdit']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppFormHeroEditComponent,
      expect.objectContaining({
        data: component.hero,
      }),
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalSuccessMessageComponent,
      expect.any(Object),
    );
  });

  it('should open edit dialog and show error snackbar when edit result is 2', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(2));

    component['OpenFormHeroeEdit']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppFormHeroEditComponent,
      expect.objectContaining({
        data: component.hero,
      }),
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalErrorMessageComponent,
      expect.any(Object),
    );
  });

  it('should cleanup on destroy', () => {
    const nextSpy = vi.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = vi.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
