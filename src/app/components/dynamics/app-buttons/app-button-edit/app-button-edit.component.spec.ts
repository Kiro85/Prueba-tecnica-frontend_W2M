import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonEditComponent } from './app-button-edit.component';

describe('AppButtonEditComponent', () => {
  let component: AppButtonEditComponent;
  let fixture: ComponentFixture<AppButtonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
