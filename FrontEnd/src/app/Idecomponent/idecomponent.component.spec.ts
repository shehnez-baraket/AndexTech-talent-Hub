import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdecomponentComponent } from './idecomponent.component';

describe('IdecomponentComponent', () => {
  let component: IdecomponentComponent;
  let fixture: ComponentFixture<IdecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdecomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
