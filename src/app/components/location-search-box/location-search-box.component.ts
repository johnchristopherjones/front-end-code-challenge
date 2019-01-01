import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { SearchLocations, SelectLocation, ChangeDates } from 'src/app/actions/location.actions';
import { AutofillAirport } from 'src/app/models/autofill-airport.model';
import { AutofillLocation } from 'src/app/models/autofill-location.model';
import { State } from 'src/app/reducers';
import { getAllAutofillAirports } from 'src/app/reducers/autofill-airport.reducer';
import { getAllAutofillLocations } from 'src/app/reducers/autofill-location.reducer';
import { getCheckinoutDates, getSelectedLocationId } from 'src/app/reducers/location.reducer';

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

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router) {}

  ngOnInit() {
    // Create a new Reactive Form
    this.searchForm = this.fb.group({
      searchTerm: '',
      checkinDate: null,
      checkoutDate: null
    });

    // Initialize form with initial values from store
    this.store.pipe(select(getCheckinoutDates), takeUntil(this.destroy$), tap(value => console.log(value)))
      .subscribe(dates => this.searchForm.patchValue(dates, { emitEvent: false }));

    // Subscribe to changes in searchTerm and emit an action.
    this.searchForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ searchTerm }) =>
        this.store.dispatch(new SearchLocations({ searchTerm })));

    // Subscribe to autofill options; these will change as search results come in
    this.locationOptions$ = this.store.pipe(select(getAllAutofillLocations));
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

  changeDate() {
    const { checkinDate, checkoutDate } = this.searchForm.value;
    this.store.dispatch(new ChangeDates({ checkinDate, checkoutDate }));
  }
}
