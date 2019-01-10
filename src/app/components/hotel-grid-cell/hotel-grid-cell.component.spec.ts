import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelGridCellComponent } from './hotel-grid-cell.component';

describe('HotelGridCellComponent', () => {
  let component: HotelGridCellComponent;
  let fixture: ComponentFixture<HotelGridCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelGridCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelGridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
