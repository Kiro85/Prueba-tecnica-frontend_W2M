import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormHeroEditComponent } from './app-form-hero-edit.component';


describe('AppFormHeroEditComponent', () => {
  let component: AppFormHeroEditComponent;
  let fixture: ComponentFixture<AppFormHeroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormHeroEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormHeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
