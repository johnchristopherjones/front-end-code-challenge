import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesMenuComponent } from './amenities-menu.component';

describe('AmenitiesMenuComponent', () => {
  let component: AmenitiesMenuComponent;
  let fixture: ComponentFixture<AmenitiesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
