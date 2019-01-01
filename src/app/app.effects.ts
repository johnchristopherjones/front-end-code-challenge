import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, debounceTime, filter, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { ApiResponseError, CoreActionTypes } from './actions/core.actions';
import { LoadLocations, LocationActionTypes, SearchLocations, SelectLocation } from './actions/location.actions';
import { RoomkeyApiService } from './services/roomkey-api.service';


@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  logApiResponseErrors = this.actions$.pipe(
    ofType<ApiResponseError>(CoreActionTypes.ApiResponseError),
    tap(({ payload: { error }}) => console.log(error))
  );

  /**
   * Request location autofill choices from the API server.
   */
  @Effect()
  searchLocations$ = ({ debounce = 200 /*ms*/ } = {}) => this.actions$.pipe(
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

  )

  constructor(private actions$: Actions, private api: RoomkeyApiService) { }
}
