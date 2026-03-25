import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonCreateComponent } from './app-button-create.component';

describe('AppButtonCreateComponent', () => {
  let component: AppButtonCreateComponent;
  let fixture: ComponentFixture<AppButtonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppButtonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
