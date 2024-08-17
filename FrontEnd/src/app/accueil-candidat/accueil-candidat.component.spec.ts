import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilCandidatComponent } from './accueil-candidat.component';

describe('AccueilCandidatComponent', () => {
  let component: AccueilCandidatComponent;
  let fixture: ComponentFixture<AccueilCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
