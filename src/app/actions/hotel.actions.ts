import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Hotel } from '../models/hotel.model';

export enum HotelActionTypes {
  LoadHotels = '[Hotel] Load Hotels',
  AddHotel = '[Hotel] Add Hotel',
  UpsertHotel = '[Hotel] Upsert Hotel',
  AddHotels = '[Hotel] Add Hotels',
  UpsertHotels = '[Hotel] Upsert Hotels',
  UpdateHotel = '[Hotel] Update Hotel',
  UpdateHotels = '[Hotel] Update Hotels',
  DeleteHotel = '[Hotel] Delete Hotel',
  DeleteHotels = '[Hotel] Delete Hotels',
  ClearHotels = '[Hotel] Clear Hotels'
}

export class LoadHotels implements Action {
  readonly type = HotelActionTypes.LoadHotels;

  constructor(public payload: { hotels: Hotel[] }) {}
}

export class AddHotel implements Action {
  readonly type = HotelActionTypes.AddHotel;

  constructor(public payload: { hotel: Hotel }) {}
}

export class UpsertHotel implements Action {
  readonly type = HotelActionTypes.UpsertHotel;

  constructor(public payload: { hotel: Hotel }) {}
}

export class AddHotels implements Action {
  readonly type = HotelActionTypes.AddHotels;

  constructor(public payload: { hotels: Hotel[] }) {}
}

export class UpsertHotels implements Action {
  readonly type = HotelActionTypes.UpsertHotels;

  constructor(public payload: { hotels: Hotel[] }) {}
}

export class UpdateHotel implements Action {
  readonly type = HotelActionTypes.UpdateHotel;

  constructor(public payload: { hotel: Update<Hotel> }) {}
}

export class UpdateHotels implements Action {
  readonly type = HotelActionTypes.UpdateHotels;

  constructor(public payload: { hotels: Update<Hotel>[] }) {}
}

export class DeleteHotel implements Action {
  readonly type = HotelActionTypes.DeleteHotel;

  constructor(public payload: { id: string }) {}
}

export class DeleteHotels implements Action {
  readonly type = HotelActionTypes.DeleteHotels;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearHotels implements Action {
  readonly type = HotelActionTypes.ClearHotels;
}

export type HotelActions =
 LoadHotels
 | AddHotel
 | UpsertHotel
 | AddHotels
 | UpsertHotels
 | UpdateHotel
 | UpdateHotels
 | DeleteHotel
 | DeleteHotels
 | ClearHotels;
