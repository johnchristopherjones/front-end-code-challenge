import { Geometry } from './geometry.model';

export interface Location {
  id: string;
  lat: number;
  lng: number;
  has_photo: boolean;
  hotel_count: number;
  region_name: string;
  name: string;
  country_code: string;
  full_name: string;
  geometry: Geometry;
}
