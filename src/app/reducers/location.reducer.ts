import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Location } from '../models/location.model';
import { LocationActions, LocationActionTypes } from '../actions/location.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Location> {
  // additional entities state properties
  selectedLocation: string;
}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedLocation: null
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
      return {
        ...state,
        selectedLocation: action.payload.id
      };
    }

    default: {
      return state;
    }
  }
}

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
