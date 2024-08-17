import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerQuestionsAdminComponent } from './lister-questions-admin.component';

describe('ListerQuestionsAdminComponent', () => {
  let component: ListerQuestionsAdminComponent;
  let fixture: ComponentFixture<ListerQuestionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerQuestionsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerQuestionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
