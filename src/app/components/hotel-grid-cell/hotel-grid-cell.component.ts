import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotel-grid-cell',
  templateUrl: './hotel-grid-cell.component.html',
  styleUrls: ['./hotel-grid-cell.component.scss']
})
export class HotelGridCellComponent implements OnInit {
  @Input() hotel: Hotel;

  constructor() { }

  ngOnInit() {
  }

  primaryPhoto(primaryPhoto, size: '200x150' | '500x375' | 'big' = 'big'): string {
    // big = 800x533
    return `https://d29u3c1wxehloe.cloudfront.net${primaryPhoto.id}${size}.jpg`;
  }

}
