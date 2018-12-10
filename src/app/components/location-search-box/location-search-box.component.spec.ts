import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationSearchBoxComponent } from './location-search-box.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SearchLocations } from 'src/app/actions/location.actions';
import {
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationSearchBoxComponent', () => {
  let component: LocationSearchBoxComponent;
  let fixture: ComponentFixture<LocationSearchBoxComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchBoxComponent ],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Typing search terms', () => {
    let input: DebugElement;
    let inputEl: HTMLInputElement;
    beforeEach(() => {
      input = fixture.debugElement.query(By.css('input'));
      inputEl = input.nativeElement;
    });
    it('should dispatch after typing', fakeAsync(() => {
      const searchTerm = 'Char';
      inputEl.value = searchTerm;
      component.searchForm.markAsTouched();
      input.triggerEventHandler('input', { target: inputEl });
      fixture.detectChanges();
      flush();

      expect(store.dispatch).toHaveBeenCalledWith(new SearchLocations({ searchTerm }));
    }));
  });
});
