import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Location } from '../models/location.model';

export enum LocationActionTypes {
  LoadLocations = '[Location] Load Locations',
  AddLocation = '[Location] Add Location',
  UpsertLocation = '[Location] Upsert Location',
  AddLocations = '[Location] Add Locations',
  UpsertLocations = '[Location] Upsert Locations',
  UpdateLocation = '[Location] Update Location',
  UpdateLocations = '[Location] Update Locations',
  DeleteLocation = '[Location] Delete Location',
  DeleteLocations = '[Location] Delete Locations',
  ClearLocations = '[Location] Clear Locations',
  SearchLocations = '[Location] Search Locations',
  SelectLocation = '[Location] Select Location'
}

export class LoadLocations implements Action {
  readonly type = LocationActionTypes.LoadLocations;

  constructor(public payload: { locations: Location[] }) {}
}

export class AddLocation implements Action {
  readonly type = LocationActionTypes.AddLocation;

  constructor(public payload: { location: Location }) {}
}

export class UpsertLocation implements Action {
  readonly type = LocationActionTypes.UpsertLocation;

  constructor(public payload: { location: Location }) {}
}

export class AddLocations implements Action {
  readonly type = LocationActionTypes.AddLocations;

  constructor(public payload: { locations: Location[] }) {}
}

export class UpsertLocations implements Action {
  readonly type = LocationActionTypes.UpsertLocations;

  constructor(public payload: { locations: Location[] }) {}
}

export class UpdateLocation implements Action {
  readonly type = LocationActionTypes.UpdateLocation;

  constructor(public payload: { location: Update<Location> }) {}
}

export class UpdateLocations implements Action {
  readonly type = LocationActionTypes.UpdateLocations;

  constructor(public payload: { locations: Update<Location>[] }) {}
}

export class DeleteLocation implements Action {
  readonly type = LocationActionTypes.DeleteLocation;

  constructor(public payload: { id: string }) {}
}

export class DeleteLocations implements Action {
  readonly type = LocationActionTypes.DeleteLocations;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearLocations implements Action {
  readonly type = LocationActionTypes.ClearLocations;
}

export class SearchLocations implements Action {
  readonly type = LocationActionTypes.SearchLocations;

  constructor(public payload: { searchTerm: string, checkinDate: Date, checkoutDate: Date }) {}
}

export class SelectLocation implements Action {
  readonly type = LocationActionTypes.SelectLocation;

  constructor(public payload: { id: string }) {}
}

export type LocationActions =
 LoadLocations
 | AddLocation
 | UpsertLocation
 | AddLocations
 | UpsertLocations
 | UpdateLocation
 | UpdateLocations
 | DeleteLocation
 | DeleteLocations
 | ClearLocations
 | SearchLocations
 | SelectLocation;
