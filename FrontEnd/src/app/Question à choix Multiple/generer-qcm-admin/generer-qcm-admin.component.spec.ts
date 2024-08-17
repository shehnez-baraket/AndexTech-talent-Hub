import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererQcmAdminComponent } from './generer-qcm-admin.component';

describe('GenererQcmAdminComponent', () => {
  let component: GenererQcmAdminComponent;
  let fixture: ComponentFixture<GenererQcmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererQcmAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenererQcmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
