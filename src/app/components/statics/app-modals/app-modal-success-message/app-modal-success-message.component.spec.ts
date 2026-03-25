import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalSuccessMessageComponent } from './app-modal-success-message.component';

describe('AppModalSuccessMessageComponent', () => {
  let component: AppModalSuccessMessageComponent;
  let fixture: ComponentFixture<AppModalSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalSuccessMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
