import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { getSelectedAmenityIds } from 'src/app/reducers/amenity.reducer';
import { getSelectedBrandIds } from 'src/app/reducers/brand.reducer';
import { getAllHotels } from 'src/app/reducers/hotel.reducer';
import { HotelGridDataSource } from './hotel-grid-datasource';
import { Observable } from 'rxjs';
import { Rate } from 'src/app/models/rate.model';
import { getRateByUdicode, getRateEntities } from 'src/app/reducers/rate.reducer';
import { map, tap } from 'rxjs/operators';

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
    const selectRateEntities$ = this.store.pipe(select(getRateEntities));
    this.dataSource = new HotelGridDataSource(hotels$, selectedAmenityIds$, selectedBrandIds$, selectRateEntities$);
  }

  trackBy(index, item) {
    return item[0].udicode;
  }

  primaryPhoto(primaryPhoto, size: '200x150' | '500x375' | 'big' = 'big'): string {
    // big = 800x533
    return `https://d29u3c1wxehloe.cloudfront.net${primaryPhoto.id}${size}.jpg`;
  }

  getRate$(udicode): Observable<Rate> {
    return this.store.pipe(
      select(state => getRateByUdicode(state, udicode)),
      // return null if no rate or no rate.segments
      tap(v => console.log(v)),
      map(rate => rate && rate.amount.segments && rate));
  }
}
