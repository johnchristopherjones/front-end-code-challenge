import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { merge, of, timer } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, flatMap, map, mergeMap, switchMap, tap, withLatestFrom, retryWhen, retry, delayWhen } from 'rxjs/operators';
import { LoadAmenities } from './actions/amenity.actions';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { LoadBrands } from './actions/brand.actions';
import { ApiResponseError, CoreActionTypes } from './actions/core.actions';
import { LoadHotels } from './actions/hotel.actions';
import { LoadLocations, LocationActionTypes, SearchLocations, SelectLocation, SelectLocationSuccess } from './actions/location.actions';
import { LoadRates } from './actions/rate.actions';
import { RouterStateUrl } from './custom-route-serializer';
import { State } from './reducers';
import { getHotelIds } from './reducers/hotel.reducer';
import { getHotelSearchTerms } from './reducers/location.reducer';
import { RoomkeyApiService } from './services/roomkey-api.service';
import { chunkArray } from './reducers/utilities';
import { MatSnackBar } from '@angular/material';


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
    tap(({ payload: { error } }) => console.log(error))
  );

  /**
   * Request location autofill choices from the API server.
   */
  @Effect()
  loadAutofillLocations$ = ({ debounce = 200 /*ms*/ } = {}) =>
    this.actions$.pipe(
      // Listen to SearchLoaction actions
      ofType<SearchLocations>(LocationActionTypes.SearchLocations),
      // But wait until the events stop coming in for a little bit
      debounceTime(debounce),
      // Hit the API with that search query
      switchMap(({ payload: { searchTerm } }) =>
        this.api.autofill(searchTerm).pipe(
          // Make sure we retain the last useful autofill results
          filter(({ locations, airports }) => locations.length > 0 && airports.length > 0),
          // Split response into load actions for each store
          flatMap(({ locations: autofillLocations, airports: autofillAirports }) => [
            new LoadAutofillLocations({ autofillLocations }),
            new LoadAutofillAirports({ autofillAirports })
          ]),
          // Handle errors (kinda)
          catchError(error => merge(of(new ApiResponseError({ error })), of({ searchTerm, locations: [], airports: [] })))
        )
      )
    );

  /**
   * Request details about the selected location
   */
  @Effect()
  selectLocation$ = ({ debounce = 200 /*ms*/ } = {}) =>
    this.actions$.pipe(
      ofType<SelectLocation>(LocationActionTypes.SelectLocation),
      debounceTime(debounce),
      // Ignore if no location has been selected
      filter(({ payload: { id } }) => !!id),
      switchMap(({ payload: { id } }) =>
        this.api.location(id).pipe(
          map(location => new LoadLocations({ locations: [location] })),
          catchError(error => of(new ApiResponseError({ error })))
        )
      )
    );

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
      // Ignore if no location is selected
      filter(({ id }) => !!id),
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
    );

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
      // Ignore if no hotels have beenf ound
      filter(ids => ids.length > 0),
      withLatestFrom(this.store.pipe(select(getHotelSearchTerms))),
      /*
       * Encounting a problem where the /rates endpoint seems to randomly
       * return empty results for the same request. On the theory that it's a
       * silent failure due to excessive udicodes, the following mergeMaps
       * partition udicodes into smaller chunks, then send out smaller API
       * requests concurrently.
       *
       * NOTE: Theory appears to be at least partly wrong.
       *
       * NOTE: mergeMap has weird polymorphism depending on the return type
       * of the function you provide. Using both implementations here. In
       * general terms, mergeMap unconditionally emits once for each item
       * within the return value of the passed function. The return value
       * might be an array or an observable.
       */
      mergeMap(([udicodes, { checkin, checkout, rooms, guests }]) => {
        // Partition udicodes into chunks
        const chunks = chunkArray(udicodes, 40);
        // return API parameters by chunks of udi codes
        return chunks.map(chunk => ({ udicodes: chunk, checkin, checkout, rooms, guests }));
      }),
      mergeMap(({ udicodes, checkin, checkout, rooms, guests }) =>
        this.api.rates(udicodes, checkin, checkout, guests, rooms).pipe(
          // If we get an empty result, we'll retry those rates.
          tap(({ data: rates }) => {
            if (rates.length === 0) {
              throw rates;
            }
          }),
          retryWhen(errors =>
            errors.pipe(
              delayWhen((rates, i) => {
                const MAXATTEMPTS = 3;
                if (i > MAXATTEMPTS) {
                  this.announceGivingUpOnrates(MAXATTEMPTS);
                  throw rates;
                }
                this.announceRetryOnRates(i, MAXATTEMPTS);
                return timer(2000);
              })
            )
          ),
          map(({ data: rates }) => new LoadRates({ rates })),
          catchError(error => of(new ApiResponseError({ error })))
        )
      )
    )

  ////////////////////
  // Router Effects //
  ////////////////////

  /**
   * Select location when the route includes a location id
   */
  @Effect()
  locationRoute$ = () =>
    this.actions$.pipe(
      ofType<RouterNavigatedAction<RouterStateUrl>>(ROUTER_NAVIGATED),
      filter(({ payload: { routerState: { params } } }) => params && params.locationId),
      map(({ payload: { routerState: { params } } }) => params.locationId),
      map(id => new SelectLocation({ id }))
    )

  constructor(private actions$: Actions, private api: RoomkeyApiService, private store: Store<State>, private snack: MatSnackBar) {}

  announceGivingUpOnrates(maxAttempts) {
    console.log(`Giving up on /rates after ${maxAttempts} attempts`);
    const afterClosed = this.snack._openedSnackBarRef ? this.snack._openedSnackBarRef.afterDismissed() : of(null);
    afterClosed.subscribe(() => {
      this.snack.open(`Sorry, we're having trouble talking to the server.`, 'RELOAD').afterDismissed().subscribe(_ => {
        document.location.reload();
      });
    });
  }

  announceRetryOnRates(attempt, maxAttempts) {
    console.log(`Attempting to retry /rates: ${attempt + 1} / ${maxAttempts}`);
    const afterClosed = this.snack._openedSnackBarRef ? this.snack._openedSnackBarRef.afterDismissed() : of(null);
    afterClosed.subscribe(() => {
      this.snack.open(`Unlocking a better rate in ${maxAttempts - attempt}…`, null, { duration: 2000 });
    });
  }

}
