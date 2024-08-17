import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmAdminComponent } from './qcm-admin.component';

describe('QcmAdminComponent', () => {
  let component: QcmAdminComponent;
  let fixture: ComponentFixture<QcmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcmAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
