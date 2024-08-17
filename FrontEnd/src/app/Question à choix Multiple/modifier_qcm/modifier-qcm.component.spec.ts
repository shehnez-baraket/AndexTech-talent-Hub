import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierQcmComponent } from './modifier-qcm.component';

describe('ModifierQcmComponent', () => {
  let component: ModifierQcmComponent;
  let fixture: ComponentFixture<ModifierQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierQcmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
