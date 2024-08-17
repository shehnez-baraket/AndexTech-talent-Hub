import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerQuestionnairesComponent } from './lister-questionnaires.component';

describe('ListerQuestionnairesComponent', () => {
  let component: ListerQuestionnairesComponent;
  let fixture: ComponentFixture<ListerQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerQuestionnairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
