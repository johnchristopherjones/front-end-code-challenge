import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Rate } from '../models/rate.model';
import { RateActions, RateActionTypes } from '../actions/rate.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Rate> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Rate> = createEntityAdapter<Rate>({
  // NOTE: rates have both `udicode` and `id`; not sure if both are unique
  // Going with `udicode` for now because it's simpler to join with hotels.
  selectId: rate => rate.udicode
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: RateActions
): State {
  switch (action.type) {
    case RateActionTypes.AddRate: {
      return adapter.addOne(action.payload.rate, state);
    }

    case RateActionTypes.UpsertRate: {
      return adapter.upsertOne(action.payload.rate, state);
    }

    case RateActionTypes.AddRates: {
      return adapter.addMany(action.payload.rates, state);
    }

    case RateActionTypes.UpsertRates: {
      return adapter.upsertMany(action.payload.rates, state);
    }

    case RateActionTypes.UpdateRate: {
      return adapter.updateOne(action.payload.rate, state);
    }

    case RateActionTypes.UpdateRates: {
      return adapter.updateMany(action.payload.rates, state);
    }

    case RateActionTypes.DeleteRate: {
      return adapter.removeOne(action.payload.id, state);
    }

    case RateActionTypes.DeleteRates: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case RateActionTypes.LoadRates: {
      return adapter.addAll(action.payload.rates, state);
    }

    case RateActionTypes.ClearRates: {
      return adapter.removeAll(state);
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

export const stateKey = 'rates';
export const getRateState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getRateIds,
  selectEntities: getRateEntities,
  selectAll: getAllRates,
  selectTotal: getTotalRates,
} = adapter.getSelectors(getRateState);

export const getRateByUdicode = createSelector(getRateEntities, (entities, code: string) => entities[code]);
