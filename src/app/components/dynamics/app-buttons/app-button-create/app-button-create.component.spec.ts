import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppButtonCreateComponent } from './app-button-create.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppFormHeroCreateComponent } from '../../../statics/app-forms/app-form-hero/app-form-hero.component';
import { AppModalSuccessMessageComponent } from '../../app-modals/app-modal-success-message/app-modal-success-message.component';
import { AppModalErrorMessageComponent } from '../../app-modals/app-modal-error-message/app-modal-error-message.component';

describe('AppButtonCreateComponent', () => {
  let fixture: ComponentFixture<AppButtonCreateComponent>;
  let component: AppButtonCreateComponent;

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
      imports: [AppButtonCreateComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog open', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(1));

    component.OpenCreateHeroeForm();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open dialog and show success snackbar when result is 1', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(1));

    component.OpenCreateHeroeForm();

    expect(mockDialog.open).toHaveBeenCalledWith(AppFormHeroCreateComponent, expect.any(Object));
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      AppModalSuccessMessageComponent,
      expect.any(Object),
    );
  });

  it('should open dialog and show error snackbar when result is 2', () => {
    mockDialogRef.afterClosed.mockReturnValue(of(2));

    component.OpenCreateHeroeForm();

    expect(mockDialog.open).toHaveBeenCalledWith(AppFormHeroCreateComponent, expect.any(Object));
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
