import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerFeedbacksComponent } from './lister-feedbacks.component';

describe('ListerFeedbacksComponent', () => {
  let component: ListerFeedbacksComponent;
  let fixture: ComponentFixture<ListerFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
