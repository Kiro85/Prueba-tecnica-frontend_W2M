import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppErrorMessageComponent } from './app-error-message.component';

describe('AppErrorMessageComponent', () => {
  let component: AppErrorMessageComponent;
  let fixture: ComponentFixture<AppErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppErrorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
