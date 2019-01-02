import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Amenity } from '../models/amenity.model';
import { AmenityActions, AmenityActionTypes } from '../actions/amenity.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { idsToEntities } from './utilities';

export interface State extends EntityState<Amenity> {
  // additional entities state properties
  popular: string[];
  selected: string[];
}

export const adapter: EntityAdapter<Amenity> = createEntityAdapter<Amenity>({ selectId: amenity => amenity.code });

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  popular: ['FBKFST', 'FRWI', 'ASHUT', 'FIT', 'PKG', 'IPOOL'],
  selected: []
});

export function reducer(
  state = initialState,
  action: AmenityActions
): State {
  switch (action.type) {
    case AmenityActionTypes.AddAmenity: {
      return adapter.addOne(action.payload.amenity, state);
    }

    case AmenityActionTypes.UpsertAmenity: {
      return adapter.upsertOne(action.payload.amenity, state);
    }

    case AmenityActionTypes.AddAmenities: {
      return adapter.addMany(action.payload.amenities, state);
    }

    case AmenityActionTypes.UpsertAmenities: {
      return adapter.upsertMany(action.payload.amenities, state);
    }

    case AmenityActionTypes.UpdateAmenity: {
      return adapter.updateOne(action.payload.amenity, state);
    }

    case AmenityActionTypes.UpdateAmenities: {
      return adapter.updateMany(action.payload.amenities, state);
    }

    case AmenityActionTypes.DeleteAmenity: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AmenityActionTypes.DeleteAmenities: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AmenityActionTypes.LoadAmenities: {
      return adapter.addAll(action.payload.amenities, state);
    }

    case AmenityActionTypes.ClearAmenities: {
      return adapter.removeAll(state);
    }

    case AmenityActionTypes.SelectAmenities: {
      const { ids: selected } = action.payload;
      return { ...state, selected };
    }

    default: {
      return state;
    }
  }
}

export const stateKey = 'amenities';
export const getAmentitiesState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getAmenityIds,
  selectEntities: getAmentityEntities,
  selectAll: getAllAmenities,
  selectTotal: getTotalAmenities,
} = adapter.getSelectors(getAmentitiesState);

export const getSelectedAmenityIds = createSelector(getAmentitiesState, state => state.selected);
export const getSelectedAmenities = createSelector(getAmentityEntities, getSelectedAmenityIds, idsToEntities);

const getPopularAmenitiesIds = createSelector(getAmentitiesState, state => state.popular);
export const getPopularAmenities = createSelector(getAmentityEntities, getPopularAmenitiesIds, idsToEntities);
