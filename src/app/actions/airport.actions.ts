import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Airport } from '../models/airport.model';

export enum AirportActionTypes {
  LoadAirports = '[Airport] Load Airports',
  AddAirport = '[Airport] Add Airport',
  UpsertAirport = '[Airport] Upsert Airport',
  AddAirports = '[Airport] Add Airports',
  UpsertAirports = '[Airport] Upsert Airports',
  UpdateAirport = '[Airport] Update Airport',
  UpdateAirports = '[Airport] Update Airports',
  DeleteAirport = '[Airport] Delete Airport',
  DeleteAirports = '[Airport] Delete Airports',
  ClearAirports = '[Airport] Clear Airports'
}

export class LoadAirports implements Action {
  readonly type = AirportActionTypes.LoadAirports;

  constructor(public payload: { airports: Airport[] }) {}
}

export class AddAirport implements Action {
  readonly type = AirportActionTypes.AddAirport;

  constructor(public payload: { airport: Airport }) {}
}

export class UpsertAirport implements Action {
  readonly type = AirportActionTypes.UpsertAirport;

  constructor(public payload: { airport: Airport }) {}
}

export class AddAirports implements Action {
  readonly type = AirportActionTypes.AddAirports;

  constructor(public payload: { airports: Airport[] }) {}
}

export class UpsertAirports implements Action {
  readonly type = AirportActionTypes.UpsertAirports;

  constructor(public payload: { airports: Airport[] }) {}
}

export class UpdateAirport implements Action {
  readonly type = AirportActionTypes.UpdateAirport;

  constructor(public payload: { airport: Update<Airport> }) {}
}

export class UpdateAirports implements Action {
  readonly type = AirportActionTypes.UpdateAirports;

  constructor(public payload: { airports: Update<Airport>[] }) {}
}

export class DeleteAirport implements Action {
  readonly type = AirportActionTypes.DeleteAirport;

  constructor(public payload: { id: string }) {}
}

export class DeleteAirports implements Action {
  readonly type = AirportActionTypes.DeleteAirports;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAirports implements Action {
  readonly type = AirportActionTypes.ClearAirports;
}

export type AirportActions =
 LoadAirports
 | AddAirport
 | UpsertAirport
 | AddAirports
 | UpsertAirports
 | UpdateAirport
 | UpdateAirports
 | DeleteAirport
 | DeleteAirports
 | ClearAirports;
