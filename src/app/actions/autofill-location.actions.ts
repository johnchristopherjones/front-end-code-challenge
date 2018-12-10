import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AutofillLocation } from '../models/autofill-location.model';

export enum AutofillLocationActionTypes {
  LoadAutofillLocations = '[AutofillLocation] Load AutofillLocations',
  AddAutofillLocation = '[AutofillLocation] Add AutofillLocation',
  UpsertAutofillLocation = '[AutofillLocation] Upsert AutofillLocation',
  AddAutofillLocations = '[AutofillLocation] Add AutofillLocations',
  UpsertAutofillLocations = '[AutofillLocation] Upsert AutofillLocations',
  UpdateAutofillLocation = '[AutofillLocation] Update AutofillLocation',
  UpdateAutofillLocations = '[AutofillLocation] Update AutofillLocations',
  DeleteAutofillLocation = '[AutofillLocation] Delete AutofillLocation',
  DeleteAutofillLocations = '[AutofillLocation] Delete AutofillLocations',
  ClearAutofillLocations = '[AutofillLocation] Clear AutofillLocations'
}

export class LoadAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.LoadAutofillLocations;

  constructor(public payload: { autofillLocations: AutofillLocation[] }) {}
}

export class AddAutofillLocation implements Action {
  readonly type = AutofillLocationActionTypes.AddAutofillLocation;

  constructor(public payload: { autofillLocation: AutofillLocation }) {}
}

export class UpsertAutofillLocation implements Action {
  readonly type = AutofillLocationActionTypes.UpsertAutofillLocation;

  constructor(public payload: { autofillLocation: AutofillLocation }) {}
}

export class AddAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.AddAutofillLocations;

  constructor(public payload: { autofillLocations: AutofillLocation[] }) {}
}

export class UpsertAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.UpsertAutofillLocations;

  constructor(public payload: { autofillLocations: AutofillLocation[] }) {}
}

export class UpdateAutofillLocation implements Action {
  readonly type = AutofillLocationActionTypes.UpdateAutofillLocation;

  constructor(public payload: { autofillLocation: Update<AutofillLocation> }) {}
}

export class UpdateAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.UpdateAutofillLocations;

  constructor(public payload: { autofillLocations: Update<AutofillLocation>[] }) {}
}

export class DeleteAutofillLocation implements Action {
  readonly type = AutofillLocationActionTypes.DeleteAutofillLocation;

  constructor(public payload: { id: string }) {}
}

export class DeleteAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.DeleteAutofillLocations;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAutofillLocations implements Action {
  readonly type = AutofillLocationActionTypes.ClearAutofillLocations;
}

export type AutofillLocationActions =
 LoadAutofillLocations
 | AddAutofillLocation
 | UpsertAutofillLocation
 | AddAutofillLocations
 | UpsertAutofillLocations
 | UpdateAutofillLocation
 | UpdateAutofillLocations
 | DeleteAutofillLocation
 | DeleteAutofillLocations
 | ClearAutofillLocations;
