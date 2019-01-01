import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LocationActionTypes, SearchLocations, SelectLocation, LoadLocations } from './actions/location.actions';
import { tap, debounceTime, switchMap, flatMap, catchError, filter, map } from 'rxjs/operators';
import { RoomkeyApiService } from './services/roomkey-api.service';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { of, empty } from 'rxjs';


@Injectable()
export class AppEffects {

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
      // Handle errors (kinda)
      catchError(err => {
        console.log(err);
        return of({ searchTerm, locations: [], airports: [] });
      })
    )),
    // Split response into load actions for each store
    flatMap(({ locations: autofillLocations, airports: autofillAirports }) => [
      new LoadAutofillLocations({ autofillLocations }),
      new LoadAutofillAirports({ autofillAirports })
    ]),
  )

  /**
   * Request details about the selected location
   */
  @Effect()
  selectLocation$ = ({ debounce = 200 /*ms*/ } = {}) => this.actions$.pipe(
    ofType<SelectLocation>(LocationActionTypes.SelectLocation),
    debounceTime(debounce),
    switchMap(({ payload: { id } }) => this.api.location(id).pipe(
      catchError(err => {
        console.log(err);
        return empty();
      })
    )),
    map(location => new LoadLocations({ locations: [ location ]}))
  )

  constructor(private actions$: Actions, private api: RoomkeyApiService) { }
}
