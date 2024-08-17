import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFeedbackComponent } from './modifier-feedback.component';

describe('ModifierFeedbackComponent', () => {
  let component: ModifierFeedbackComponent;
  let fixture: ComponentFixture<ModifierFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
