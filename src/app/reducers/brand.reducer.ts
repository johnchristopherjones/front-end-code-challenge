import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Brand } from '../models/brand.model';
import { BrandActions, BrandActionTypes } from '../actions/brand.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { idsToEntities } from './utilities';

export interface State extends EntityState<Brand> {
  // additional entities state properties
  selected: string[];
}

export const adapter: EntityAdapter<Brand> = createEntityAdapter<Brand>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selected: [],
});

export function reducer(
  state = initialState,
  action: BrandActions
): State {
  switch (action.type) {
    case BrandActionTypes.AddBrand: {
      return adapter.addOne(action.payload.brand, state);
    }

    case BrandActionTypes.UpsertBrand: {
      return adapter.upsertOne(action.payload.brand, state);
    }

    case BrandActionTypes.AddBrands: {
      return adapter.addMany(action.payload.brands, state);
    }

    case BrandActionTypes.UpsertBrands: {
      return adapter.upsertMany(action.payload.brands, state);
    }

    case BrandActionTypes.UpdateBrand: {
      return adapter.updateOne(action.payload.brand, state);
    }

    case BrandActionTypes.UpdateBrands: {
      return adapter.updateMany(action.payload.brands, state);
    }

    case BrandActionTypes.DeleteBrand: {
      return adapter.removeOne(action.payload.id, state);
    }

    case BrandActionTypes.DeleteBrands: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case BrandActionTypes.LoadBrands: {
      return adapter.addAll(action.payload.brands, state);
    }

    case BrandActionTypes.ClearBrands: {
      return adapter.removeAll(state);
    }

    case BrandActionTypes.SelectBrands: {
      const { ids: selected } = action.payload;
      return { ...state, selected };
    }

    default: {
      return state;
    }
  }
}

export const stateKey = 'brands';
export const getBrandState = createFeatureSelector<State>(stateKey);

export const {
  selectIds: getBrandIds,
  selectEntities: getBrandEntities,
  selectAll: getAllBrands,
  selectTotal: getTotalBrands,
} = adapter.getSelectors(getBrandState);

export const getSelectedBrandIds = createSelector(getBrandState, state => state.selected);
export const getSelectedBrands = createSelector(getBrandEntities, getSelectedBrandIds, idsToEntities);
