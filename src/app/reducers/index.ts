import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromHotels from './hotel.reducer';
import * as fromLocations from './location.reducer';
import * as fromAirports from './airport.reducer';
import * as fromAutofillAiports from './autofill-airport.reducer';
import * as fromAutofillLocations from './autofill-location.reducer';

export interface State {
  autofillAirports: fromAutofillAiports.State;
  autofillLocations: fromAutofillLocations.State;
  airports: fromAirports.State;
  hotels: fromHotels.State;
  locations: fromLocations.State;
}

export const reducers: ActionReducerMap<State> = {
  autofillAirports: fromAutofillAiports.reducer,
  autofillLocations: fromAutofillLocations.reducer,
  airports: fromAirports.reducer,
  hotels: fromHotels.reducer,
  locations: fromLocations.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectHotels = createFeatureSelector<fromHotels.State>('hotels');

export const selectLocations = createFeatureSelector<fromLocations.State>('locations');

export const selectAutofillLocations = createFeatureSelector<fromAutofillLocations.State>('autofillLocations');
export const selectAllAutofillLocations = createSelector(selectAutofillLocations, fromAutofillLocations.selectAll);

export const selectAutofillAirports = createFeatureSelector<fromAutofillAiports.State>('autofillAirports');
export const selectAllAutofillAirports = createSelector(selectAutofillAirports, fromAutofillAiports.selectAll);
