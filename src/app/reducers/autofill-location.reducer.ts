import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AutofillLocation } from '../models/autofill-location.model';
import { AutofillLocationActions, AutofillLocationActionTypes } from '../actions/autofill-location.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<AutofillLocation> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AutofillLocation> = createEntityAdapter<AutofillLocation>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: AutofillLocationActions
): State {
  switch (action.type) {
    case AutofillLocationActionTypes.AddAutofillLocation: {
      return adapter.addOne(action.payload.autofillLocation, state);
    }

    case AutofillLocationActionTypes.UpsertAutofillLocation: {
      return adapter.upsertOne(action.payload.autofillLocation, state);
    }

    case AutofillLocationActionTypes.AddAutofillLocations: {
      return adapter.addMany(action.payload.autofillLocations, state);
    }

    case AutofillLocationActionTypes.UpsertAutofillLocations: {
      return adapter.upsertMany(action.payload.autofillLocations, state);
    }

    case AutofillLocationActionTypes.UpdateAutofillLocation: {
      return adapter.updateOne(action.payload.autofillLocation, state);
    }

    case AutofillLocationActionTypes.UpdateAutofillLocations: {
      return adapter.updateMany(action.payload.autofillLocations, state);
    }

    case AutofillLocationActionTypes.DeleteAutofillLocation: {
      return adapter.removeOne(action.payload.id, state);
    }

    case AutofillLocationActionTypes.DeleteAutofillLocations: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case AutofillLocationActionTypes.LoadAutofillLocations: {
      return adapter.addAll(action.payload.autofillLocations, state);
    }

    case AutofillLocationActionTypes.ClearAutofillLocations: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
export const stateKey = 'autofillLocations';
export const getAutofillLocationState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getAutofillLocationIds,
  selectEntities: getAutofillLocationEntities,
  selectAll: getAllAutofillLocations,
  selectTotal: getTotalAutofillLocations,
} = adapter.getSelectors(getAutofillLocationState);
