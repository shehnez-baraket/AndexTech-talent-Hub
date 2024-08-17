import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterQuestionnaireComponent } from './ajouter-questionnaire.component';

describe('AjouterQuestionnaireComponent', () => {
  let component: AjouterQuestionnaireComponent;
  let fixture: ComponentFixture<AjouterQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterQuestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
