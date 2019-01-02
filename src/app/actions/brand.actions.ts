import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Brand } from '../models/brand.model';

export enum BrandActionTypes {
  LoadBrands = '[Brand] Load Brands',
  AddBrand = '[Brand] Add Brand',
  UpsertBrand = '[Brand] Upsert Brand',
  AddBrands = '[Brand] Add Brands',
  UpsertBrands = '[Brand] Upsert Brands',
  UpdateBrand = '[Brand] Update Brand',
  UpdateBrands = '[Brand] Update Brands',
  DeleteBrand = '[Brand] Delete Brand',
  DeleteBrands = '[Brand] Delete Brands',
  ClearBrands = '[Brand] Clear Brands',
  SelectBrands = '[Brand] Select Brands'
}

export class LoadBrands implements Action {
  readonly type = BrandActionTypes.LoadBrands;

  constructor(public payload: { brands: Brand[] }) {}
}

export class AddBrand implements Action {
  readonly type = BrandActionTypes.AddBrand;

  constructor(public payload: { brand: Brand }) {}
}

export class UpsertBrand implements Action {
  readonly type = BrandActionTypes.UpsertBrand;

  constructor(public payload: { brand: Brand }) {}
}

export class AddBrands implements Action {
  readonly type = BrandActionTypes.AddBrands;

  constructor(public payload: { brands: Brand[] }) {}
}

export class UpsertBrands implements Action {
  readonly type = BrandActionTypes.UpsertBrands;

  constructor(public payload: { brands: Brand[] }) {}
}

export class UpdateBrand implements Action {
  readonly type = BrandActionTypes.UpdateBrand;

  constructor(public payload: { brand: Update<Brand> }) {}
}

export class UpdateBrands implements Action {
  readonly type = BrandActionTypes.UpdateBrands;

  constructor(public payload: { brands: Update<Brand>[] }) {}
}

export class DeleteBrand implements Action {
  readonly type = BrandActionTypes.DeleteBrand;

  constructor(public payload: { id: string }) {}
}

export class DeleteBrands implements Action {
  readonly type = BrandActionTypes.DeleteBrands;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearBrands implements Action {
  readonly type = BrandActionTypes.ClearBrands;
}

export class SelectBrands implements Action {
  readonly type = BrandActionTypes.SelectBrands;

  constructor(public payload: { ids: string[] }) {}
}

export type BrandActions =
 LoadBrands
 | AddBrand
 | UpsertBrand
 | AddBrands
 | UpsertBrands
 | UpdateBrand
 | UpdateBrands
 | DeleteBrand
 | DeleteBrands
 | ClearBrands
 | SelectBrands;
