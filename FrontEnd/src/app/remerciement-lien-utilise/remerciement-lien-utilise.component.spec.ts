import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemerciementLienUtiliseComponent } from './remerciement-lien-utilise.component';

describe('RemerciementLienUtiliseComponent', () => {
  let component: RemerciementLienUtiliseComponent;
  let fixture: ComponentFixture<RemerciementLienUtiliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemerciementLienUtiliseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemerciementLienUtiliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
