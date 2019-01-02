import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { HotelActions, HotelActionTypes } from '../actions/hotel.actions';
import { HotelMetadata } from '../models/hotel-metadata.model';
import { Hotel } from '../models/hotel.model';

export interface State extends EntityState<Hotel> {
  // additional entities state properties
  metadata: HotelMetadata;
}

export const adapter: EntityAdapter<Hotel> = createEntityAdapter<Hotel>({
  selectId: hotel => hotel.udicode
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  metadata: null
});

export function reducer(
  state = initialState,
  action: HotelActions
): State {
  switch (action.type) {
    case HotelActionTypes.AddHotel: {
      return adapter.addOne(action.payload.hotel, state);
    }

    case HotelActionTypes.UpsertHotel: {
      return adapter.upsertOne(action.payload.hotel, state);
    }

    case HotelActionTypes.AddHotels: {
      return adapter.addMany(action.payload.hotels, state);
    }

    case HotelActionTypes.UpsertHotels: {
      return adapter.upsertMany(action.payload.hotels, state);
    }

    case HotelActionTypes.UpdateHotel: {
      return adapter.updateOne(action.payload.hotel, state);
    }

    case HotelActionTypes.UpdateHotels: {
      return adapter.updateMany(action.payload.hotels, state);
    }

    case HotelActionTypes.DeleteHotel: {
      return adapter.removeOne(action.payload.id, state);
    }

    case HotelActionTypes.DeleteHotels: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case HotelActionTypes.LoadHotels: {
      const { metadata } = action.payload;
      return adapter.addAll(action.payload.hotels, { ...state, metadata });
    }

    case HotelActionTypes.ClearHotels: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const stateKey = 'hotels';
export const getHotelState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getHotelIds,
  selectEntities: getHotelEntities,
  selectAll: getAllHotels,
  selectTotal: getTotalHotels,
} = adapter.getSelectors(getHotelState);
