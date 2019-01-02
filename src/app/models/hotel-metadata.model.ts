import { Amenity } from './amenity.model';

export interface HotelMetadataStatistic {
  highest: number;
  lowest: number;
  mean: number;
  median: number | null;
}

export interface HotelMetadataBrand {
  group_id: string; // an integer in a string
  hotel_count: number;
  id: string; // an integer in a string
  name: string;
}

/** Appears be a group-by of brands on group_id, where id = group_id */
export type HotelMetadataGroups = HotelMetadataBrand;

export interface HotelMetadata {
  aggregated_best_rates: HotelMetadataStatistic;
  aggregated_start_ratings: HotelMetadataStatistic;
  aggreated_user_ratings: HotelMetadataStatistic;
  amenities: Amenity[];
  brands: HotelMetadataBrand[];
  groups: HotelMetadataGroups[];
  hotel_count: number;
  hotel_count_by_star_rating: number[];
  hotel_count_by_sublocation: {};
  hotel_count_by_user_rating: number[];
}
