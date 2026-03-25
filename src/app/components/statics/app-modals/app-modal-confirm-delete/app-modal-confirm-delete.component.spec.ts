import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalConfirmDeleteComponent } from './app-modal-confirm-delete.component';

describe('AppModalConfirmDeleteComponent', () => {
  let component: AppModalConfirmDeleteComponent;
  let fixture: ComponentFixture<AppModalConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalConfirmDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
