import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Rate } from '../models/rate.model';

export enum RateActionTypes {
  LoadRates = '[Rate] Load Rates',
  AddRate = '[Rate] Add Rate',
  UpsertRate = '[Rate] Upsert Rate',
  AddRates = '[Rate] Add Rates',
  UpsertRates = '[Rate] Upsert Rates',
  UpdateRate = '[Rate] Update Rate',
  UpdateRates = '[Rate] Update Rates',
  DeleteRate = '[Rate] Delete Rate',
  DeleteRates = '[Rate] Delete Rates',
  ClearRates = '[Rate] Clear Rates',
}

export class LoadRates implements Action {
  readonly type = RateActionTypes.LoadRates;

  constructor(public payload: { rates: Rate[] }) {}
}

export class AddRate implements Action {
  readonly type = RateActionTypes.AddRate;

  constructor(public payload: { rate: Rate }) {}
}

export class UpsertRate implements Action {
  readonly type = RateActionTypes.UpsertRate;

  constructor(public payload: { rate: Rate }) {}
}

export class AddRates implements Action {
  readonly type = RateActionTypes.AddRates;

  constructor(public payload: { rates: Rate[] }) {}
}

export class UpsertRates implements Action {
  readonly type = RateActionTypes.UpsertRates;

  constructor(public payload: { rates: Rate[] }) {}
}

export class UpdateRate implements Action {
  readonly type = RateActionTypes.UpdateRate;

  constructor(public payload: { rate: Update<Rate> }) {}
}

export class UpdateRates implements Action {
  readonly type = RateActionTypes.UpdateRates;

  constructor(public payload: { rates: Update<Rate>[] }) {}
}

export class DeleteRate implements Action {
  readonly type = RateActionTypes.DeleteRate;

  constructor(public payload: { id: string }) {}
}

export class DeleteRates implements Action {
  readonly type = RateActionTypes.DeleteRates;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearRates implements Action {
  readonly type = RateActionTypes.ClearRates;
}

export type RateActions =
 LoadRates
 | AddRate
 | UpsertRate
 | AddRates
 | UpsertRates
 | UpdateRate
 | UpdateRates
 | DeleteRate
 | DeleteRates
 | ClearRates;