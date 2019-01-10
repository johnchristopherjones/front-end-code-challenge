import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelGridComponent } from './hotel-grid.component';

describe('HotelGridComponent', () => {
  let component: HotelGridComponent;
  let fixture: ComponentFixture<HotelGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
