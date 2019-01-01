import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutofillAirport } from '../models/autofill-airport.model';
import { AutofillLocation } from '../models/autofill-location.model';
import { Location } from '../models/location.model';

export const AUTOFILL_URI = `${environment.API}/autofill`;
export const locationUri = (id: string) => `${environment.API}/locations/${id}`;

interface AutofillResponse {
  query: string;
  locations: AutofillLocation[];
  airports: AutofillAirport[];
}

type LocationResponse = Location;

const defaultLocationFields: (keyof Location)[] = [
  'id', 'lat', 'lng', 'has_photo', 'hotel_count', 'region_name',
  'name', 'country_code', 'country_name', 'full_name', 'geometry'
];



/**
 * Requests that can be made to the Roomkey API server.
 *
 * Notes:
 * - Most API endpoints appear to accept a list of fields to return.
 * - The API returns fields in snake_case.
 * - In production, the Roomkey website requests fields with snakeCase,
 *   but the API appears to accept snake_case.
 */
@Injectable({
  providedIn: 'root'
})
export class RoomkeyApiService {

  constructor(private http: HttpClient) { }

  /** Get autofill options for location search */
  autofill(query: string): Observable<AutofillResponse> {
    return this.http.get<AutofillResponse>(AUTOFILL_URI, { params: { query }});
  }

  /** Get details about location */
  location(id: string, ...fields: (keyof Location)[]): Observable<LocationResponse> {
    fields = fields.length === 0 ? defaultLocationFields : fields;
    return this.http.get<LocationResponse>(locationUri(id), { params: { 'fields[]': fields }, });
  }

  }
}
