import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierQuestionnaireComponent } from './modifier-questionnaire.component';

describe('ModifierQuestionnaireComponent', () => {
  let component: ModifierQuestionnaireComponent;
  let fixture: ComponentFixture<ModifierQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
