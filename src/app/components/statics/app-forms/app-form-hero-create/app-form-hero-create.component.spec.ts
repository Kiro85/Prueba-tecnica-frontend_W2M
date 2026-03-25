import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormHeroCreateComponent } from './app-form-hero-create.component';


describe('AppFormHeroCreateComponent', () => {
  let component: AppFormHeroCreateComponent;
  let fixture: ComponentFixture<AppFormHeroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormHeroCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormHeroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
