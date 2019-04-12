import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Location } from '../models/location.model';
import { LocationActions, LocationActionTypes } from '../actions/location.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Location> {
  // additional entities state properties
  selectedLocation: string;
  checkin: Date;
  checkout: Date;
  rooms: number;
  guests: number;
  isLoading: boolean;
}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

const daysFromNow = (days) => {
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next;
};

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedLocation: null,
  checkin: daysFromNow(1),
  checkout: daysFromNow(2),
  rooms: 2,
  guests: 2,
  isLoading: false
});

export function reducer(
  state = initialState,
  action: LocationActions
): State {
  switch (action.type) {
    case LocationActionTypes.AddLocation: {
      return adapter.addOne(action.payload.location, state);
    }

    case LocationActionTypes.UpsertLocation: {
      return adapter.upsertOne(action.payload.location, state);
    }

    case LocationActionTypes.AddLocations: {
      return adapter.addMany(action.payload.locations, state);
    }

    case LocationActionTypes.UpsertLocations: {
      return adapter.upsertMany(action.payload.locations, state);
    }

    case LocationActionTypes.UpdateLocation: {
      return adapter.updateOne(action.payload.location, state);
    }

    case LocationActionTypes.UpdateLocations: {
      return adapter.updateMany(action.payload.locations, state);
    }

    case LocationActionTypes.DeleteLocation: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LocationActionTypes.DeleteLocations: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case LocationActionTypes.LoadLocations: {
      return adapter.addAll(action.payload.locations, state);
    }

    case LocationActionTypes.ClearLocations: {
      return adapter.removeAll(state);
    }

    case LocationActionTypes.SelectLocation: {
      const { id: selectedLocation } = action.payload;
      return { ...state, selectedLocation, isLoading: true };
    }

    case LocationActionTypes.SelectLocationSuccess: {
      return { ...state, isLoading: false };
    }

    case LocationActionTypes.ChangeDates: {
      const { checkin } = action.payload;
      let { checkout } = action.payload;
      // Always keep checkoutDate one day in advance of checkinDate
      const dateStrings = [checkin, checkout].map(date => date.toISOString().slice(0, 10));
      if (dateStrings[0] >= dateStrings[1]) {
        checkout = new Date(checkin);
        checkout.setHours(checkout.getHours() + 24);
      }
      return { ...state, checkin, checkout };
    }

    default: {
      return state;
    }
  }
}

/**
 * Selectors for this entity model.
 *
 * Selectors are analogous to the functions you pass to re-frame subscription
 * registration. They select some slice of the redux store. Using the helper
 * functions `createSelector` and `createFeatureSelector`, your selectors are
 * also memo-ized against the identities of recent arguments.
 */

export const stateKey = 'locations';
export const getLocationState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getLocationIds,
  selectEntities: getLocationEntities,
  selectAll: getAllLocations,
  selectTotal: getTotalLocations,
} = adapter.getSelectors(getLocationState);

export const getSelectedLocationId = createSelector(getLocationState, state => state.selectedLocation);
export const getSelectedLocation = createSelector(
  getLocationEntities,
  getSelectedLocationId,
  (entities, id) => entities[id]
);

export const getCheckinoutDates = createSelector(getLocationState, ({ checkin, checkout }) => ({ checkin, checkout }));
export const getLocationIsLoading = createSelector(getLocationState, ({ isLoading }) => isLoading);

export const getHotelSearchTerms = createSelector(
  getLocationState,
  ({ selectedLocation, checkin, checkout, rooms, guests }) => ({ id: selectedLocation, checkin, checkout, rooms, guests })
);
