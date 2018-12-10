import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutofillAirport } from '../models/autofill-airport.model';
import { AutofillLocation } from '../models/autofill-location.model';

interface AutofillResponse {
  query: string;
  locations: AutofillLocation[];
  airports: AutofillAirport[];
}

@Injectable({
  providedIn: 'root'
})
export class RoomkeyApiService {

  autofill(query: string): Observable<AutofillResponse> {
    return this.http.get<AutofillResponse>(`${environment.API}/autofill`, { params: { query }});
  }

  constructor(private http: HttpClient) { }
}
