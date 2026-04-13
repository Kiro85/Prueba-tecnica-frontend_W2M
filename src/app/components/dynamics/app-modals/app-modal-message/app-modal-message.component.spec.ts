import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalMessageComponent } from './app-modal-message.component';

describe('AppModalMessageComponent', () => {
  let component: AppModalMessageComponent;
  let fixture: ComponentFixture<AppModalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
