import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterQuestionAdminComponent } from './ajouter-question-admin.component';

describe('AjouterQuestionAdminComponent', () => {
  let component: AjouterQuestionAdminComponent;
  let fixture: ComponentFixture<AjouterQuestionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterQuestionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterQuestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
