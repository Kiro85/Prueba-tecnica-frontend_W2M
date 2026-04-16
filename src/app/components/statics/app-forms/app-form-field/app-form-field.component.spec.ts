import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppFormFieldComponent } from './app-form-field.component';

import { FormControl } from '@angular/forms';

describe('AppFormFieldComponent', () => {
  let component: AppFormFieldComponent;
  let fixture: ComponentFixture<AppFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set file when onFileSelected is triggered', () => {
    const control = new FormControl();
    const file = new File(['data'], 'file.png');

    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component['onFileSelected'](control, event);

    expect(control.value).toBe(file);
  });
});
