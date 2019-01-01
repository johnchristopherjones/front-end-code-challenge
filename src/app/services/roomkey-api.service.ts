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

const defaultLocationFields = [
  'countryName', 'countryCode', 'fullName', 'hotelCount',
  'name', 'regionName', 'lat', 'lng', 'geometry', 'id',
  'has_photo'
];

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
  location(id: string, ...fields: string[]): Observable<LocationResponse> {
    fields = fields.length === 0 ? defaultLocationFields : fields;
    return this.http.get<LocationResponse>(locationUri(id), { params: { 'fields[]': fields }, });
  }

  }
}
