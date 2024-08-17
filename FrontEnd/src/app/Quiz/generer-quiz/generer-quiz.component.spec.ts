import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererQuizComponent } from './generer-quiz.component';

describe('GenererQuizComponent', () => {
  let component: GenererQuizComponent;
  let fixture: ComponentFixture<GenererQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenererQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
