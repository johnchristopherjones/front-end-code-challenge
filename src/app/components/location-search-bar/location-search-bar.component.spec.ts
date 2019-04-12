import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSearchBarComponent } from './location-search-bar.component';

describe('LocationSearchBarComponent', () => {
  let component: LocationSearchBarComponent;
  let fixture: ComponentFixture<LocationSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
