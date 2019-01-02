import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsMenuComponent } from './brands-menu.component';

describe('BrandsMenuComponent', () => {
  let component: BrandsMenuComponent;
  let fixture: ComponentFixture<BrandsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
