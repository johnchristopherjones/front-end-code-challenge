import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutofillAirport } from '../models/autofill-airport.model';
import { AutofillLocation } from '../models/autofill-location.model';
import { Location } from '../models/location.model';
import { Hotel } from '../models/hotel.model';
import { HotelMetadata } from '../models/hotel-metadata.model';
import { Rate } from '../models/rate.model';

export const AUTOFILL_URI = `${environment.API}/autofill`;
export const locationUri = (id: string) => `${environment.API}/locations/${id}`;
export const hotelsUri = (id: string) => `${environment.API}/locations/${id}/hotels`;
export const RATES_URI = `${environment.API}/rates`;

interface AutofillResponse {
  query: string;
  locations: AutofillLocation[];
  airports: AutofillAirport[];
}

type LocationResponse = Location;

const defaultLocationFields: (keyof Location)[] = [
  'id', 'lat', 'lng', 'has_photo', 'hotel_count', 'region_name',
  'name', 'country_code', 'country_name', 'full_name', 'geometry',
];

interface HotelResponse {
  data: Hotel[];
  metadata: HotelMetadata;
}

interface RateResponse {
  data: Rate[];
  metadata: {
    fulfilled: boolean;
  };
}

const defaultHotelFields: (keyof Hotel)[] = [
  'address', 'brand', 'country_code', 'lat', 'lng', 'name',
  'primary_photo', 'udicode', 'user_rating', 'amenities'
];

export const detailedHotelFields: (keyof Hotel)[] = [
  'address', 'amenities', 'brand', 'country_code', 'description', 'group',
  'indicative_rate', 'lat', 'lng', 'location_id', 'locations', 'name',
  'photos', 'primary_photo', 'reservation_telephone', 'stars',
  'tripadvisor', 'udicode', 'user_rating', 'vfm_url',
];

export const defaultRateFields: (keyof Rate)[] = [
'booking_url',
'cancellation_penalties',
'currency',
'guarantees_required',
'id',
'is_direct',
'nightly_rate',
'non_qualified_rate_range',
'optional_attributes',
'partner_code',
'qualification',
'rate_description',
'room_description',
'room_type',
'strikethrough_rate',
'udicode',
'flexibility',

// 'booking_url', 'cancellation_penalties', 'currency', 'guarantees_required',
//   'id', 'is_direct', 'nightly_rate',
//   'non_qualified_rate_range', 'optional_attributes', 'partner_code',
//   'qualification', 'rate_description', 'room_description', 'room_type',
//   'strikethrough_rate', 'udicode', 'flexibility'
  // NOTE: These fields are requested by the official roomkey client,  but NOT returned by the API:
  // 'billing_currency', 'billing_nightly_rate', 'billing_strikethrough_rate',
  // 'hide_amount?', 'hmac',
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
  constructor(private http: HttpClient) {}

  /** Get autofill options for location search */
  autofill(query: string): Observable<AutofillResponse> {
    return this.http.get<AutofillResponse>(AUTOFILL_URI, { params: { query } });
  }

  /** Get details about location */
  location(id: string, ...fields: (keyof Location)[]): Observable<LocationResponse> {
    fields = fields.length === 0 ? defaultLocationFields : fields;
    return this.http.get<LocationResponse>(locationUri(id), { params: { 'fields[]': fields } });
  }

  /** Get hotels at location */
  hotels(locationId: string, checkInDate: Date, checkOutDate: Date, ...fields: (keyof Hotel)[]): Observable<HotelResponse> {
    fields = fields.length === 0 ? defaultHotelFields : fields;
    const params = {
      'fields[]': fields,
      limit: '20',
      metadata: 'true',
      offset: '0',
      sort: 'distance-asc',
      checkIn: checkInDate.toISOString().slice(0, 10),
      checkOut: checkOutDate.toISOString().slice(0, 10)
    };
    return this.http.get<HotelResponse>(hotelsUri(locationId), { params });
  }

  /**
   * Get rates!
   * @param uidcodes array of udicodes for hotels
   * @param checkIn date of check in
   * @param checkOut date of check out
   * @param guests number of guests
   * @param rooms number of rooms
   * @param currency currency ('USD' only)
   * @param fields optional fields to request
   */
  rates(
    uidcodes: string[],
    checkIn: Date,
    checkOut: Date,
    guests = 2,
    rooms = 1,
    currency = 'USD',
    ...fields: (keyof Rate)[]
  ): Observable<RateResponse> {
    const params = {
      guests: '' + guests,
      rooms: '' + rooms,
      checkIn: checkIn.toISOString().slice(0, 10),
      checkOut: checkOut.toISOString().slice(0, 10),
      currency,
      'udicode[]': uidcodes,
      'fields[]': fields.length === 0 ? defaultRateFields : fields
    };
    return this.http.get<RateResponse>(RATES_URI, { params });
  }
}
