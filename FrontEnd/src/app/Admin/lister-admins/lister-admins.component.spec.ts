import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerAdminsComponent } from './lister-admins.component';

describe('ListerAdminsComponent', () => {
  let component: ListerAdminsComponent;
  let fixture: ComponentFixture<ListerAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
