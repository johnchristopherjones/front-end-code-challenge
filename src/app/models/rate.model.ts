export interface Rate {
  amount: {
    taxes: number[],
    fees: number;
    segments: {
      start: string, // RFC3339 date
      nights: number,
      amount: number,
      fees: number[],
      taxes: {
        amount: number[]
      }[];
    }[];
  };
  booking_url: string;
  cancellation_penalties: string[];
  currency: 'USD';
  flexibility: string;
  guarantees_required: string[];
  hide_amount?: boolean;
  id: string;
  is_direct: boolean;
  nightly_rate: number[];
  non_qualified_rate_range: [[number, number], [number, number]]; // 2x2 or unbounded?
  optional_attributes: {
    'breakfast?': false;
    'free_wifi?': false;
    'free_internet?': false;
    'free_internet': false;
    'breakfast': false
  };
  partner_code: string;
  qualification: string;
  rate_description: string;
  room_description: string;
  room_type: string;
  strikethrough_rate: [number, number];
  udicode: string;
}
