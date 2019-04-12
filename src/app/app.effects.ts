import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { merge, of, empty } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  flatMap,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { LoadAmenities } from './actions/amenity.actions';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { LoadBrands } from './actions/brand.actions';
import { ApiResponseError, CoreActionTypes } from './actions/core.actions';
import { LoadHotels } from './actions/hotel.actions';
import { LoadLocations, LocationActionTypes, SearchLocations, SelectLocation, SelectLocationSuccess } from './actions/location.actions';
import { RouterStateUrl } from './custom-route-serializer';
import { State } from './reducers';
import { getHotelState, getHotelIds } from './reducers/hotel.reducer';
import { getHotelSearchTerms, getLocationEntities, getLocationIds, getLocationState } from './reducers/location.reducer';
import { RoomkeyApiService } from './services/roomkey-api.service';
import { LoadRates } from './actions/rate.actions';


@Injectable()
export class AppEffects {
  /////////////////
  // API Effects //
  /////////////////

  /**
   * Deal with errors from API response.
   *
   * Currently just log to console.
   */
  @Effect({ dispatch: false })
  logApiResponseErrors = this.actions$.pipe(
    ofType<ApiResponseError>(CoreActionTypes.ApiResponseError),
    tap(({ payload: { error }}) => console.log(error))
  );

  /**
   * Request location autofill choices from the API server.
   */
  @Effect()
  loadAutofillLocations$ = ({ debounce = 200 /*ms*/ } = {}) => this.actions$.pipe(
    // Listen to SearchLoaction actions
    ofType<SearchLocations>(LocationActionTypes.SearchLocations),
    // But wait until the events stop coming in for a little bit
    debounceTime(debounce),
    // Hit the API with that search query
    switchMap(({ payload: { searchTerm } }) => this.api.autofill(searchTerm).pipe(
      // Make sure we retain the last useful autofill results
      filter(({ locations, airports }) => locations.length > 0 && airports.length > 0),
      // Split response into load actions for each store
      flatMap(({ locations: autofillLocations, airports: autofillAirports }) => [
        new LoadAutofillLocations({ autofillLocations }),
        new LoadAutofillAirports({ autofillAirports })
      ]),
      // Handle errors (kinda)
      catchError(error => merge(
        of(new ApiResponseError({ error })),
        of({ searchTerm, locations: [], airports: [] })
      ))
    )),
  )

  /**
   * Request details about the selected location
   */
  @Effect()
  selectLocation$ = ({ debounce = 200 /*ms*/ } = {}) => this.actions$.pipe(
    ofType<SelectLocation>(LocationActionTypes.SelectLocation),
    debounceTime(debounce),
    switchMap(({ payload: { id } }) => this.api.location(id).pipe(
      map(location => new LoadLocations({ locations: [ location ] })),
      catchError(error => of(new ApiResponseError({ error })))
    )),
  )

  /**
   * Request hotels for the selected location
   *
   * NOTE: we could combine searchHotels and selectLocation into a single effect
   * that makes two HTTP requests, but splitting up the effects and hanging them
   * off the same action makes any error-handling logic simpler to follow.
   */
  @Effect()
  searchHotels$ = ({ debounce = 200 /*ms*/ } = {}) =>
    this.store.pipe(
      select(getHotelSearchTerms),
      debounceTime(debounce),
      // Check for differnt terms
      distinctUntilChanged((x, y) => Object.keys(x).every(k => x[k] === y[k])),
      // Look up hotels at this location
      switchMap(({ id, checkin, checkout }) =>
        this.api.hotels(id, checkin, checkout).pipe(
          mergeMap(({ data: hotels, metadata }) => [
            new LoadHotels({ hotels, metadata }),
            new LoadAmenities({ amenities: metadata.amenities }),
            new LoadBrands({ brands: metadata.brands }),
            new SelectLocationSuccess({ id })
          ]),
          catchError(error => of(new ApiResponseError({ error })))
        )
      )
    )

  /**
   * Request rates for the found hotels
   *
   * NOTE: We're chaining this API request directly off data that was stored
   * by searchHotels$.  We could have chained this more directly, but this
   * method keeps the data flow cleaner.  For example, we could trivially
   * disable this effect or modify the selector to constrain the rates we
   * request from the API by using a different selector.
   */
  @Effect()
  getRates$ = ({ debounce = 200 /*ms*/ } = {}) =>
  this.store.pipe(
    select(getHotelIds),
    filter(ids => ids.length > 0),
    withLatestFrom(this.store.pipe(select(getHotelSearchTerms))),
    switchMap(([udicodes, { checkin, checkout, rooms, guests }]) =>
      this.api.rates(udicodes as string[], checkin, checkout, guests, rooms).pipe(
        map(({ data: rates }) => new LoadRates({ rates })))
    )
  )

  ////////////////////
  // Router Effects //
  ////////////////////

  /**
   * Select location when the route includes a location id
   */
  @Effect()
  locationRoute$ = () => this.actions$.pipe(
    ofType<RouterNavigatedAction<RouterStateUrl>>(ROUTER_NAVIGATED),
    filter(({payload: { routerState: { params } } }) => params && params.locationId),
    map(({payload: { routerState: { params } } }) => params.locationId),
    map(id => new SelectLocation({ id }))
  )

  constructor(private actions$: Actions, private api: RoomkeyApiService, private store: Store<State>) {}
}
