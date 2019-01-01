import { Component, OnInit, OnDestroy } from '@angular/core';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilKeyChanged, takeUntil, tap } from 'rxjs/operators';
import { SearchLocations, SelectLocation } from 'src/app/actions/location.actions';
import { Subject, Observable } from 'rxjs';
import { AutofillLocation } from 'src/app/models/autofill-location.model';
import { AutofillAirport } from 'src/app/models/autofill-airport.model';
import { getAllAutofillLocations } from 'src/app/reducers/autofill-location.reducer';
import { getAllAutofillAirports } from 'src/app/reducers/autofill-airport.reducer';

@Component({
  selector: 'app-location-search-box',
  templateUrl: './location-search-box.component.html',
  styleUrls: ['./location-search-box.component.scss']
})
export class LocationSearchBoxComponent implements OnDestroy, OnInit {
  destroy$ = new Subject();
  searchForm: FormGroup;
  locationOptions$: Observable<AutofillLocation[]>;
  airportOptions$: Observable<AutofillAirport[]>;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    // Create a new Reactive Form
    this.searchForm = this.fb.group({
      searchTerm: '',
      checkinDate: null,
      checkoutDate: null
    });

    // Subscribe to changes in searchTerm and emit an action.
    this.searchForm.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilKeyChanged('searchTerm'))
      .subscribe(({ searchTerm }) => this.store.dispatch(new SearchLocations({ searchTerm })));

    // Subscribe to autofill options
    this.locationOptions$ = this.store.pipe(select(getAllAutofillLocations), tap(vs => console.log(vs)));
    this.airportOptions$ = this.store.pipe(select(getAllAutofillAirports));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  displayWith(option: AutofillLocation) {
    return option.name;
  }

  selected({ option: { value: { id }}}) {
    this.store.dispatch(new SelectLocation({ id }));
  }

}
