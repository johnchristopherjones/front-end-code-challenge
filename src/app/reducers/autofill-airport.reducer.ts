import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AutofillAirport } from '../models/autofill-airport.model';
import { AutofillAirportActions, AutofillAirportActionTypes } from '../actions/autofill-airport.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<AutofillAirport> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AutofillAirport> = createEntityAdapter<AutofillAirport>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: AutofillAirportActions
): State {
  switch (action.type) {
    case AutofillAirportActionTypes.AddAutofillAirport: {
      return adapter.addOne(action.payload.autofillAirport, state);
    }

    case AutofillAirportActionTypes.UpsertAutofillAirport: {
      return adapter.upsertOne(action.payload.autofillAirport, state);
    }

    case AutofillAirportActionTypes.AddAutofillAirports: {
      return adapter.addMany(action.payload.autofillAirports, state);
    }

    case AutofillAirportActionTypes.UpsertAutofillAirports: {
      return adapter.upsertMany(action.payload.autofillAirports, state);
    }

    case AutofillAirportActionTypes.UpdateAutofillAirport: {
      return adapter.updateOne(action.payload.autofillAirport, state);
    }

    case AutofillAirportActionTypes.UpdateAutofillAirports: {
      return adapter.updateMany(action.payload.autofillAirports, state);
    }

    case AutofillAirportActionTypes.DeleteAutofillAirport: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AutofillAirportActionTypes.DeleteAutofillAirports: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AutofillAirportActionTypes.LoadAutofillAirports: {
      return adapter.addAll(action.payload.autofillAirports, state);
    }

    case AutofillAirportActionTypes.ClearAutofillAirports: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const stateKey = 'autofillAirports';
export const getAutofillAirportState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getAutofillAirportIds,
  selectEntities: getAutofillAirportEntities,
  selectAll: getAllAutofillAirports,
  selectTotal: getTotalAutofillAirports,
} = adapter.getSelectors(getAutofillAirportState);
