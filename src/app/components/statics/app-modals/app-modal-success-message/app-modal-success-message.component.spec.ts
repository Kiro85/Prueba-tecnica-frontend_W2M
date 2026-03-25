import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalSuccessMessageComponent } from './app-modal-success-message.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('AppModalSuccessMessageComponent', () => {
  let component: AppModalSuccessMessageComponent;
  let fixture: ComponentFixture<AppModalSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalSuccessMessageComponent],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Test message' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
