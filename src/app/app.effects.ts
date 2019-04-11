import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, filter, flatMap, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { ApiResponseError, CoreActionTypes } from './actions/core.actions';
import { LoadHotels } from './actions/hotel.actions';
import { LoadLocations, LocationActionTypes, SearchLocations, SelectLocation, SelectLocationSuccess } from './actions/location.actions';
import { RoomkeyApiService } from './services/roomkey-api.service';
import { LoadAmenities } from './actions/amenity.actions';
import { LoadBrands } from './actions/brand.actions';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';


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
  searchHotels$ = ({ debounce = 200 /*ms*/ } = {}) => this.actions$.pipe(
    ofType<SelectLocation>(LocationActionTypes.SelectLocation),
    debounceTime(debounce),
    switchMap(({ payload: { id } }) => this.api.hotels(id).pipe(
      mergeMap(({ data: hotels, metadata }) => [
        new LoadHotels({ hotels, metadata }),
        new LoadAmenities({ amenities: metadata.amenities }),
        new LoadBrands({ brands: metadata.brands }),
        new SelectLocationSuccess({ id }),
      ]),
      catchError(error => of(new ApiResponseError({ error })))
    ))
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
     filter(({ payload: { routerState: { params } } }) => params && params.locationId),
     map(({ payload: { routerState: { params } } }) => params.locationId),
     map(id => new SelectLocation({ id })),
   )

  constructor(private actions$: Actions, private api: RoomkeyApiService, private router: Router) { }
}
