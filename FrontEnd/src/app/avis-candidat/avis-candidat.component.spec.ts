import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisCandidatComponent } from './avis-candidat.component';

describe('AvisCandidatComponent', () => {
  let component: AvisCandidatComponent;
  let fixture: ComponentFixture<AvisCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
