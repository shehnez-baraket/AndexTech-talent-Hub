import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierQuestionsAdminComponent } from './modifier-questions-admin.component';

describe('ModifierQuestionsAdminComponent', () => {
  let component: ModifierQuestionsAdminComponent;
  let fixture: ComponentFixture<ModifierQuestionsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierQuestionsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierQuestionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
