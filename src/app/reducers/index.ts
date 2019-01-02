import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAirports from './airport.reducer';
import * as fromAutofillAirports from './autofill-airport.reducer';
import * as fromAutofillLocations from './autofill-location.reducer';
import * as fromHotels from './hotel.reducer';
import * as fromLocations from './location.reducer';
import * as fromAmenities from './amenity.reducer';
import * as fromBrands from './brand.reducer';

export interface State {
  [fromAmenities.stateKey]: fromAmenities.State;
  [fromAutofillAirports.stateKey]: fromAutofillAirports.State;
  [fromAutofillLocations.stateKey]: fromAutofillLocations.State;
  [fromAirports.stateKey]: fromAirports.State;
  [fromBrands.stateKey]: fromBrands.State;
  [fromHotels.stateKey]: fromHotels.State;
  [fromLocations.stateKey]: fromLocations.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromAmenities.stateKey]: fromAmenities.reducer,
  [fromAutofillAirports.stateKey]: fromAutofillAirports.reducer,
  [fromAutofillLocations.stateKey]: fromAutofillLocations.reducer,
  [fromAirports.stateKey]: fromAirports.reducer,
  [fromBrands.stateKey]: fromBrands.reducer,
  [fromHotels.stateKey]: fromHotels.reducer,
  [fromLocations.stateKey]: fromLocations.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
