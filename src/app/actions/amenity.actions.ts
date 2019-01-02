import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Amenity } from '../models/amenity.model';

export enum AmenityActionTypes {
  LoadAmenities = '[Amenity] Load Amenities',
  AddAmenity = '[Amenity] Add Amenity',
  UpsertAmenity = '[Amenity] Upsert Amenity',
  AddAmenities = '[Amenity] Add Amenities',
  UpsertAmenities = '[Amenity] Upsert Amenities',
  UpdateAmenity = '[Amenity] Update Amenity',
  UpdateAmenities = '[Amenity] Update Amenities',
  DeleteAmenity = '[Amenity] Delete Amenity',
  DeleteAmenities = '[Amenity] Delete Amenities',
  ClearAmenities = '[Amenity] Clear Amenities',
  SelectAmenities = '[Amenity] Select Amenities'
}

export class LoadAmenities implements Action {
  readonly type = AmenityActionTypes.LoadAmenities;

  constructor(public payload: { amenities: Amenity[] }) {}
}

export class AddAmenity implements Action {
  readonly type = AmenityActionTypes.AddAmenity;

  constructor(public payload: { amenity: Amenity }) {}
}

export class UpsertAmenity implements Action {
  readonly type = AmenityActionTypes.UpsertAmenity;

  constructor(public payload: { amenity: Amenity }) {}
}

export class AddAmenities implements Action {
  readonly type = AmenityActionTypes.AddAmenities;

  constructor(public payload: { amenities: Amenity[] }) {}
}

export class UpsertAmenities implements Action {
  readonly type = AmenityActionTypes.UpsertAmenities;

  constructor(public payload: { amenities: Amenity[] }) {}
}

export class UpdateAmenity implements Action {
  readonly type = AmenityActionTypes.UpdateAmenity;

  constructor(public payload: { amenity: Update<Amenity> }) {}
}

export class UpdateAmenities implements Action {
  readonly type = AmenityActionTypes.UpdateAmenities;

  constructor(public payload: { amenities: Update<Amenity>[] }) {}
}

export class DeleteAmenity implements Action {
  readonly type = AmenityActionTypes.DeleteAmenity;

  constructor(public payload: { id: string }) {}
}

export class DeleteAmenities implements Action {
  readonly type = AmenityActionTypes.DeleteAmenities;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAmenities implements Action {
  readonly type = AmenityActionTypes.ClearAmenities;
}

export class SelectAmenities implements Action {
  readonly type = AmenityActionTypes.SelectAmenities;

  constructor(public payload: { ids: string[] }) {}
}

export type AmenityActions =
 LoadAmenities
 | AddAmenity
 | UpsertAmenity
 | AddAmenities
 | UpsertAmenities
 | UpdateAmenity
 | UpdateAmenities
 | DeleteAmenity
 | DeleteAmenities
 | ClearAmenities
 | SelectAmenities;
