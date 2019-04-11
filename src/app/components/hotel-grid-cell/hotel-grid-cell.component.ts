import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { hotelsUri } from 'src/app/services/roomkey-api.service';

@Component({
  selector: 'app-hotel-grid-cell',
  templateUrl: './hotel-grid-cell.component.html',
  styleUrls: ['./hotel-grid-cell.component.scss']
})
export class HotelGridCellComponent implements OnInit {
  @Input() hotel: Hotel;
  showMore = false;
  MAX_AMENITIES = 2;

  get isShowMoreDisabled() {
    return this.hotel.amenities.length <= this.MAX_AMENITIES;
  }

  constructor() { }

  ngOnInit() {
  }

  primaryPhoto(primaryPhoto, size: '200x150' | '500x375' | 'big' = 'big'): string {
    // big = 800x533
    return `https://d29u3c1wxehloe.cloudfront.net${primaryPhoto.id}${size}.jpg`;
  }

  showMoreButton() {
    return this.hotel.amenities.length > this.MAX_AMENITIES;
  }

  showMoreButtonLabel() {
    return this.showMore ? 'SHOW FEWER AMENITIES' : 'SHOW MORE AMENITIES';
  }
}
