import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSelectionDialogComponent } from './candidate-selection-dialog.component';

describe('CandidateSelectionDialogComponent', () => {
  let component: CandidateSelectionDialogComponent;
  let fixture: ComponentFixture<CandidateSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateSelectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
