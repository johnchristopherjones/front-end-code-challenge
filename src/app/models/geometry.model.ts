type Lat = number;
type Lng = number;
type Coordinate = [Lat, Lng];
type Polygon = [Coordinate];
type MultiPolygon = [Polygon];

export interface Geometry {
  type: 'MultiPolygon';
  coordinates: [MultiPolygon];
}
