import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonPrimaryFormComponent } from './app-button-primary-form.component';

describe('AppButtonPrimaryFormComponent', () => {
  let component: AppButtonPrimaryFormComponent;
  let fixture: ComponentFixture<AppButtonPrimaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonPrimaryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonPrimaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
