import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { ChangeDates, SearchLocations } from 'src/app/actions/location.actions';
import { AutofillAirport } from 'src/app/models/autofill-airport.model';
import { AutofillLocation } from 'src/app/models/autofill-location.model';
import { State } from 'src/app/reducers';
import { getAllAutofillAirports } from 'src/app/reducers/autofill-airport.reducer';
import { getAllAutofillLocations } from 'src/app/reducers/autofill-location.reducer';
import { getCheckinoutDates, getSelectedLocation } from 'src/app/reducers/location.reducer';

@Component({
  selector: 'app-location-search-box',
  templateUrl: './location-search-box.component.html',
  styleUrls: ['./location-search-box.component.scss']
})
export class LocationSearchBoxComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('[formControlName="searchTerm"]') control: HTMLInputElement;
  destroy$ = new Subject();
  locationOptions$: Observable<AutofillLocation[]>;
  airportOptions$: Observable<AutofillAirport[]>;
  searchForm = this.fb.group({
    searchTerm: '',
    checkinDate: null,
    checkoutDate: null
  });

  constructor(private cd: ChangeDetectorRef, private fb: FormBuilder, private store: Store<State>, private router: Router) {}

  ngAfterViewInit() {
    this.searchForm.valueChanges.subscribe(value => {
      console.log(value.searchTerm);
    });
  }

  ngOnInit() {
    this.store.pipe(
      select(getSelectedLocation),
      filter(x => !!x),
      map(({ id, full_name: name, has_photo }) => ({ id, name, has_photo })),
      tap(v => console.log(v)))
      .subscribe(searchTerm => {
        this.searchForm.patchValue({ searchTerm });
      });

      // Initialize form with initial values from store
    this.store.pipe(select(getCheckinoutDates), takeUntil(this.destroy$))
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
    this.router.navigate(['locations', id, 'hotels']);
  }

  changeDate() {
    const { checkinDate, checkoutDate } = this.searchForm.value;
    this.store.dispatch(new ChangeDates({ checkinDate, checkoutDate }));
  }
}
