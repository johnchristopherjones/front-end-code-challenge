import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ChangeDates, SearchLocations } from '../actions/location.actions';
import { AutofillAirport } from '../models/autofill-airport.model';
import { AutofillLocation } from '../models/autofill-location.model';
import { State } from '../reducers';
import { getAllAutofillAirports } from '../reducers/autofill-airport.reducer';
import { getAllAutofillLocations } from '../reducers/autofill-location.reducer';
import { getCheckinoutDates as getCheckinCheckoutDates, getSelectedLocation } from '../reducers/location.reducer';

@Injectable({
  providedIn: 'root'
})
export class SearchFormService implements OnDestroy {
  private destroy$ = new Subject();

  // Public observables that autocompletion components can use
  locationOptions$: Observable<AutofillLocation[]>;
  airportOptions$: Observable<AutofillAirport[]>;

  // Public form that components can use
  searchForm = this.fb.group({
    searchTerm: '',
    checkinDate: null,
    checkoutDate: null
  });

  constructor(private fb: FormBuilder, private router: Router, private store: Store<State>) {
    // Initialize form with initial values from store
    const checkInOutDates = this.store.pipe(
      select(getCheckinCheckoutDates),
      takeUntil(this.destroy$)
    );
    checkInOutDates.subscribe(dates => this.searchForm.patchValue(dates, { emitEvent: false }));

    // Set selected searchTerm from store -- follows router navigation
    const selectedLocation = this.store.pipe(
      select(getSelectedLocation),
      takeUntil(this.destroy$),
      filter(x => !!x),
      map(({ id, full_name: name, has_photo }) => ({ id, name, has_photo }))
    );
    selectedLocation.subscribe(searchTerm => this.searchForm.patchValue({ searchTerm }, { emitEvent: false }));

    // Subscribe to changes in form and emit actions.
    const formSearchTerm = this.searchForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      map(({ searchTerm }) => searchTerm),
      distinctUntilChanged()
    )
    formSearchTerm.subscribe(searchTerm => this.store.dispatch(new SearchLocations({ searchTerm })));

    // Subscribe to changes in reservation dates
    const formDates = this.searchForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      map(({ checkinDate, checkoutDate }) => ({ checkinDate, checkoutDate })),
    );
    formDates.subscribe(({ checkinDate, checkoutDate }) => {
      this.store.dispatch(new ChangeDates({ checkinDate, checkoutDate }));
    });

    // Subscribe to autofill options; these will change as search results come in
    this.locationOptions$ = this.store.pipe(select(getAllAutofillLocations));
    this.airportOptions$ = this.store.pipe(select(getAllAutofillAirports));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  /** Navigate to hotels page for given location. */
  gotoHotelsPage(locationId: string) {
    this.router.navigate(['locations', locationId, 'hotels']);
  }

  /** DisplayWith function that can be used with Material Autocomplete. */
  autocompletionDisplayWith(option: AutofillLocation | AutofillAirport) {
    return option.name;
  }
}
