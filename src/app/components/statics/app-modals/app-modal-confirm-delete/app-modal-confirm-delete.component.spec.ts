import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModalConfirmDeleteComponent } from './app-modal-confirm-delete.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroStoreService } from '../../../../services/hero-store.service';

describe('AppModalConfirmDeleteComponent', () => {
  let fixture: ComponentFixture<AppModalConfirmDeleteComponent>;
  let component: AppModalConfirmDeleteComponent;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHeroStoreService = {
    deleteHeroe: vi.fn((() => of({}))),
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
      imports: [AppModalConfirmDeleteComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: HeroStoreService, useValue: mockHeroStoreService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteHeroe and close dialog with 1 on success', () => {
    component['DeleteHeroe']();

    expect(mockHeroStoreService.deleteHeroe).toHaveBeenCalledWith(mockDialogData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should call deleteHeroes and close dialog with 2 on error', () => {
    mockHeroStoreService.deleteHeroe.mockReturnValue(
      throwError(() => new Error())
    );

    component['DeleteHeroe']();

    expect(mockHeroStoreService.deleteHeroe).toHaveBeenCalledWith(mockDialogData);
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close modal without action', () => {
    component['CloseConfirmDeleteModal']();

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
