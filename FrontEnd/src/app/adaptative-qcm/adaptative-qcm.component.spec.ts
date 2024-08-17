import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptativeQcmComponent } from './adaptative-qcm.component';

describe('AdaptativeQcmComponent', () => {
  let component: AdaptativeQcmComponent;
  let fixture: ComponentFixture<AdaptativeQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaptativeQcmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdaptativeQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
