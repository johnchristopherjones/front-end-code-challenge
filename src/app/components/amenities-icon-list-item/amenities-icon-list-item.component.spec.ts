import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesIconListItemComponent } from './amenities-icon-list-item.component';

describe('AmenitiesIconListItemComponent', () => {
  let component: AmenitiesIconListItemComponent;
  let fixture: ComponentFixture<AmenitiesIconListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesIconListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesIconListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
