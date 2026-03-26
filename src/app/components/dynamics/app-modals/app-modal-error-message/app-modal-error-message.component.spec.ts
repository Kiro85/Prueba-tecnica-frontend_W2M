import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalErrorMessageComponent } from './app-modal-error-message.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('AppModalErrorMessageComponent', () => {
  let component: AppModalErrorMessageComponent;
  let fixture: ComponentFixture<AppModalErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalErrorMessageComponent],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Test message' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
