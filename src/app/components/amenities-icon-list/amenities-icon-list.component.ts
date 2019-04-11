import { Component, Input, OnChanges } from '@angular/core';
import { Amenity } from 'src/app/models/amenity.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-amenities-icon-list',
  templateUrl: './amenities-icon-list.component.html',
  styleUrls: ['./amenities-icon-list.component.scss']
})
export class AmenitiesIconListComponent {
  _amenities: Amenity[] = [];

  @Input()
  set amenities(amenities: Amenity[]) {
    // Omit non-free amenity if there is a free entry
    const names = new Set(amenities.map(a => a.name));
    this._amenities = amenities.filter(a => !names.has(`Free ${a.name}`));
  }

  @Input() shorten = 0;

  get amenities(): Amenity[] {
    return this._amenities.slice(0, this.shorten || this._amenities.length);
  }
}
