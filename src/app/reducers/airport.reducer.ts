import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Airport } from '../models/airport.model';
import { AirportActions, AirportActionTypes } from '../actions/airport.actions';

export interface State extends EntityState<Airport> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Airport> = createEntityAdapter<Airport>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: AirportActions
): State {
  switch (action.type) {
    case AirportActionTypes.AddAirport: {
      return adapter.addOne(action.payload.airport, state);
    }

    case AirportActionTypes.UpsertAirport: {
      return adapter.upsertOne(action.payload.airport, state);
    }

    case AirportActionTypes.AddAirports: {
      return adapter.addMany(action.payload.airports, state);
    }

    case AirportActionTypes.UpsertAirports: {
      return adapter.upsertMany(action.payload.airports, state);
    }

    case AirportActionTypes.UpdateAirport: {
      return adapter.updateOne(action.payload.airport, state);
    }

    case AirportActionTypes.UpdateAirports: {
      return adapter.updateMany(action.payload.airports, state);
    }

    case AirportActionTypes.DeleteAirport: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AirportActionTypes.DeleteAirports: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AirportActionTypes.LoadAirports: {
      return adapter.addAll(action.payload.airports, state);
    }

    case AirportActionTypes.ClearAirports: {
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
