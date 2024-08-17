import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizParCandidatComponent } from './list-quiz-par-candidat.component';

describe('ListQuizParCandidatComponent', () => {
  let component: ListQuizParCandidatComponent;
  let fixture: ComponentFixture<ListQuizParCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuizParCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuizParCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
