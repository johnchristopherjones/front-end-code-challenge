import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  ApiResponseError = '[Error] API Response Error'
}

export class ApiResponseError implements Action {
  readonly type = CoreActionTypes.ApiResponseError;

  constructor(public payload: { error: any }) {}
}

export type CoreActions
  = ApiResponseError;
