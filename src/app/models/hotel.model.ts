export interface Hotel {
  id: string;
  lat: number;
  lng: number;
  name: string;
  udicode: string;
  brand: {
    id: string;
    code: string;
    name: string;
    str: 'upscale' | 'upper-midscale' | 'economy';
    str_stars: number[];
  };
  photos: {
    id: string;
    caption: string;
    big: number[];
    sequence: number;
  }[];
  amenities: {
    code: string;
    name: string;
  }[];

  description: string;
  brg: {
    label: string;
    url: string;
    heading: string;
    description: string;
  };
  booking_phone_number: string;
  country_code: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    region_name: string;
    region_code: string;
    country_name: string;
    country_code: string;
    postal_code: string;
  };
  popularity: null;
  fax: string;
  group: {
    id: string;
    code: string;
    name: string;
  };
  primary_photo: {
    id: string;
    big: number[];
  };
  facebook: string;
  telephone: string;
  logo_id: string;
  twitter: string;
  location_id: string;
  year_built: null;
  reservation_telephone: null;
  user_rating: null;
  partners: {
    HLTN: {
      id: string;
      booking_partner: string;
      loyalty_partner: string;
      'booking_service?': boolean;
    };
  };
  tripadvisor: {
    popularity_rank: null;
    popularity_out_of: null;
    url: null;
    total_reviews: 0;
    rating_details: [];
    rating_breakdown: [];
    reviews: [];
  };
  short_description: string;
  locations: {
    id: string;
    name: string;
    place_type: 'city-town';
    distance: number;
  }[];
  vfm_url: null;
  is_white_label: false;
  stars: null;
  urgency_messages: null;
  triptease_id: null;
  distance: number;
  neighborhood: {
    name: null;
    tid: null;
    is_airport: null;
  };
  indicative_rate: number;
  year_renovated: null;
}
