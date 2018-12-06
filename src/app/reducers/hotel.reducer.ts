import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Hotel } from '../models/hotel.model';
import { HotelActions, HotelActionTypes } from '../actions/hotel.actions';

export interface State extends EntityState<Hotel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Hotel> = createEntityAdapter<Hotel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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
      return adapter.addAll(action.payload.hotels, state);
    }

    case HotelActionTypes.ClearHotels: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
