import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { getSelectedAmenityIds } from 'src/app/reducers/amenity.reducer';
import { getSelectedBrandIds } from 'src/app/reducers/brand.reducer';
import { getAllHotels } from 'src/app/reducers/hotel.reducer';
import { HotelGridDataSource } from './hotel-grid-datasource';

@Component({
  selector: 'app-hotel-grid',
  templateUrl: './hotel-grid.component.html',
  styleUrls: ['./hotel-grid.component.scss']
})
export class HotelGridComponent implements OnInit {
  dataSource: HotelGridDataSource;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    const hotels$ = this.store.pipe(select(getAllHotels));
    const selectedAmenityIds$ = this.store.pipe(select(getSelectedAmenityIds));
    const selectedBrandIds$ = this.store.pipe(select(getSelectedBrandIds));
    this.dataSource = new HotelGridDataSource(hotels$, selectedAmenityIds$, selectedBrandIds$);
  }

  primaryPhoto(primaryPhoto, size: '200x150' | '500x375' | 'big' = 'big'): string {
    // big = 800x533
    return `https://d29u3c1wxehloe.cloudfront.net${primaryPhoto.id}${size}.jpg`;
  }

}
