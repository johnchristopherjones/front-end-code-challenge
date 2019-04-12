import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { photoUri } from 'src/app/services/roomkey-api.service';
import { Rate } from 'src/app/models/rate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-grid-cell',
  templateUrl: './hotel-grid-cell.component.html',
  styleUrls: ['./hotel-grid-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelGridCellComponent {
  @Input() hotel: Hotel;
  @Input() rate: Rate;
  showMore = false;
  MAX_AMENITIES = 2;

  get isShowMoreDisabled() {
    return this.hotel.amenities.length <= this.MAX_AMENITIES;
  }

  constructor(private router: Router) { }


  primaryPhoto(primaryPhoto, size: '200x150' | '500x375' | 'big' = 'big'): string {
    return photoUri(primaryPhoto.id, size);
  }

  showMoreButton() {
    return this.hotel.amenities.length > this.MAX_AMENITIES;
  }

  showMoreButtonLabel() {
    return this.showMore ? 'SHOW FEWER AMENITIES' : 'SHOW MORE AMENITIES';
  }

  perNight(): number { return Math.round(this.rate.amount.segments.map(segment => segment.nights * segment.amount)
      .reduce((total, amount, i, a) => total + amount / a.length, 0));
  }

  gotoUrl(url) {
    this.router.navigateByUrl(url);
  }
}
