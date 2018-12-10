import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchBoxComponent } from './location-search-box.component';

describe('LocationSearchBoxComponent', () => {
  let component: LocationSearchBoxComponent;
  let fixture: ComponentFixture<LocationSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
