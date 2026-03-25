import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardHeroComponent } from './app-card-hero.component';

describe('AppCardHeroComponent', () => {
  let component: AppCardHeroComponent;
  let fixture: ComponentFixture<AppCardHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
