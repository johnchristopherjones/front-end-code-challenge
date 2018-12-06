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

export interface State {
  hotels: fromHotels.State;
  locations: fromLocations.State;
}

export const reducers: ActionReducerMap<State> = {
  hotels: fromHotels.reducer,
  locations: fromLocations.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectHotels = createFeatureSelector<fromHotels.State>('hotels');

export const selectLocations = createFeatureSelector<fromLocations.State>('locations');
