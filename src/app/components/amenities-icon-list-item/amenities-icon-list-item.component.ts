import { Component, Input } from '@angular/core';
import { Amenity } from 'src/app/models/amenity.model';

@Component({
  selector: 'app-amenities-icon-list-item',
  templateUrl: './amenities-icon-list-item.component.html',
  styleUrls: ['./amenities-icon-list-item.component.scss']
})
export class AmenitiesIconListItemComponent {
  @Input() amenity: Amenity;
  iconNames = {
    'air conditioning': 'ac_unit',
    'airport shuttle': 'airport_shuttle',
    'atm/bank': 'atm',
    'bar': 'local_bar',
    'breakfast': 'restaurant',
    'business center': 'business_center',
    'coffee shop': 'local_cafe',
    'common areas wheelchair accessible': 'accessible',
    'fax services': 'local_printshop',
    'fitness center': 'fitness_center',
    'free breakfast': 'free_breakfast',
    'free coffee': 'free_breakfast',
    'free internet': 'public',
    'free newspaper': 'new_releases',
    'free parking': 'local_parking',
    'free wifi': 'wifi',
    'game room': 'games',
    'indoor pool': 'pool',
    'internet': 'public',
    'laundry room': 'local_laundry_service',
    'laundry/dry cleaning services': 'local_laundry_service',
    'meeting facilities': 'meeting_room',
    'microwave': 'kitchen',
    'multi-lingual staff': 'language',
    'non-smoking rooms': 'smoke_free',
    'outdoor pool': 'pool',
    'parking': 'local_parking',
    'pay per view movies': 'movie',
    'pet friendly': 'pets',
    'pool': 'pool',
    'refrigerator': 'kitchen',
    'restaurant on site': 'restaurant',
    'room safe': 'lock',
    'room service': 'room_service',
    'smoke-free hotel': 'smoke_free',
    'tv in room': 'tv',
    'wake up service': 'alarm',
    'wifi': 'wifi',
  };

  iconName(): string {
    return this.iconNames[this.amenity.name.toLowerCase()] || 'add';
  }
}
