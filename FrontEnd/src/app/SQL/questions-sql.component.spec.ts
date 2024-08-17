import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSqlComponent } from './questions-sql.component';

describe('QuestionsSqlComponent', () => {
  let component: QuestionsSqlComponent;
  let fixture: ComponentFixture<QuestionsSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsSqlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
