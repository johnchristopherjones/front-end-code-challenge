import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AutofillAirport } from '../models/autofill-airport.model';

export enum AutofillAirportActionTypes {
  LoadAutofillAirports = '[AutofillAirport] Load AutofillAirports',
  AddAutofillAirport = '[AutofillAirport] Add AutofillAirport',
  UpsertAutofillAirport = '[AutofillAirport] Upsert AutofillAirport',
  AddAutofillAirports = '[AutofillAirport] Add AutofillAirports',
  UpsertAutofillAirports = '[AutofillAirport] Upsert AutofillAirports',
  UpdateAutofillAirport = '[AutofillAirport] Update AutofillAirport',
  UpdateAutofillAirports = '[AutofillAirport] Update AutofillAirports',
  DeleteAutofillAirport = '[AutofillAirport] Delete AutofillAirport',
  DeleteAutofillAirports = '[AutofillAirport] Delete AutofillAirports',
  ClearAutofillAirports = '[AutofillAirport] Clear AutofillAirports'
}

export class LoadAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.LoadAutofillAirports;

  constructor(public payload: { autofillAirports: AutofillAirport[] }) {}
}

export class AddAutofillAirport implements Action {
  readonly type = AutofillAirportActionTypes.AddAutofillAirport;

  constructor(public payload: { autofillAirport: AutofillAirport }) {}
}

export class UpsertAutofillAirport implements Action {
  readonly type = AutofillAirportActionTypes.UpsertAutofillAirport;

  constructor(public payload: { autofillAirport: AutofillAirport }) {}
}

export class AddAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.AddAutofillAirports;

  constructor(public payload: { autofillAirports: AutofillAirport[] }) {}
}

export class UpsertAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.UpsertAutofillAirports;

  constructor(public payload: { autofillAirports: AutofillAirport[] }) {}
}

export class UpdateAutofillAirport implements Action {
  readonly type = AutofillAirportActionTypes.UpdateAutofillAirport;

  constructor(public payload: { autofillAirport: Update<AutofillAirport> }) {}
}

export class UpdateAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.UpdateAutofillAirports;

  constructor(public payload: { autofillAirports: Update<AutofillAirport>[] }) {}
}

export class DeleteAutofillAirport implements Action {
  readonly type = AutofillAirportActionTypes.DeleteAutofillAirport;

  constructor(public payload: { id: string }) {}
}

export class DeleteAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.DeleteAutofillAirports;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAutofillAirports implements Action {
  readonly type = AutofillAirportActionTypes.ClearAutofillAirports;
}

export type AutofillAirportActions =
 LoadAutofillAirports
 | AddAutofillAirport
 | UpsertAutofillAirport
 | AddAutofillAirports
 | UpsertAutofillAirports
 | UpdateAutofillAirport
 | UpdateAutofillAirports
 | DeleteAutofillAirport
 | DeleteAutofillAirports
 | ClearAutofillAirports;
