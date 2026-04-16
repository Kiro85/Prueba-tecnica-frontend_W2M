import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCardHeroComponent } from './app-card-hero.component';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppModalConfirmDeleteComponent } from '@components/dynamics/app-modals/app-modal-confirm-delete/app-modal-confirm-delete.component';
import { AppFormHeroComponent } from '@components/statics/app-forms/app-form-hero/app-form-hero.component';
import { AppModalMessageComponent } from '@components/dynamics/app-modals/app-modal-message/app-modal-message.component';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardHeroComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open delete dialog and show success snackbar when result is true', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(true));

    component['openConfirmDeleteModal']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppModalConfirmDeleteComponent,
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalMessageComponent,
      expect.objectContaining({
        data: expect.objectContaining({
          success: true,
        }),
      }),
    );
  });

  it('should open delete dialog and show error snackbar when result is false', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(false));

    component['openConfirmDeleteModal']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppModalConfirmDeleteComponent,
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalMessageComponent,
      expect.objectContaining({
        data: expect.objectContaining({
          success: false,
        }),
      }),
    );
  });

  it('should open edit dialog and show success snackbar when result is true', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(true));

    component['openFormHeroEdit']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppFormHeroComponent,
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalMessageComponent,
      expect.objectContaining({
        data: expect.objectContaining({
          success: true,
        }),
      }),
    );
  });

  it('should open edit dialog and show error snackbar when result is false', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(false));

    component['openFormHeroEdit']();

    expect(mockDialog.open).toHaveBeenCalledWith(
      AppFormHeroComponent,
    );

    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalMessageComponent,
      expect.objectContaining({
        data: expect.objectContaining({
          success: false,
        }),
      }),
    );
  });
});
