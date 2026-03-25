import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalErrorMessageComponent } from './app-modal-error-message.component';

describe('AppModalErrorMessageComponent', () => {
  let component: AppModalErrorMessageComponent;
  let fixture: ComponentFixture<AppModalErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalErrorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
