import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesIconListComponent } from './amenities-icon-list.component';

describe('AmenitiesIconListComponent', () => {
  let component: AmenitiesIconListComponent;
  let fixture: ComponentFixture<AmenitiesIconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesIconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
