import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HotelTableDataSource } from './hotel-table-datasource';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getAllHotels } from 'src/app/reducers/hotel.reducer';
import { getSelectedAmenityIds } from 'src/app/reducers/amenity.reducer';
import { getSelectedBrandIds } from 'src/app/reducers/brand.reducer';

@Component({
  selector: 'app-hotel-table',
  templateUrl: './hotel-table.component.html',
  styleUrls: ['./hotel-table.component.scss'],
})
export class HotelTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HotelTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name'];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    const hotels$ = this.store.pipe(select(getAllHotels));
    const selectedAmenityIds$ = this.store.pipe(select(getSelectedAmenityIds));
    const selectedBrandIds$ = this.store.pipe(select(getSelectedBrandIds));
    this.dataSource = new HotelTableDataSource(this.paginator, this.sort, hotels$, selectedAmenityIds$, selectedBrandIds$);
  }
}
