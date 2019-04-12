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

const tomorrow = (next = new Date()) => {
  next.setDate(next.getDate() + 1);
  return next;
};

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedLocation: null,
  checkin: new Date('2019-04-26'),
  checkout: new Date('2019-04-27'),
  rooms: 1,
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
      const { checkinDate } = action.payload;
      let { checkoutDate } = action.payload;
      // Always keep checkoutDate one day in advance of checkinDate
      if (checkinDate > checkoutDate) {
        checkoutDate = new Date(checkinDate);
        checkoutDate.setHours(checkoutDate.getHours() + 24);
      }
      return { ...state, checkin: checkinDate, checkout: checkoutDate };
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
