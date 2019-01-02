import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HotelTableDataSource } from './hotel-table-datasource';
import { State } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getAllHotels } from 'src/app/reducers/hotel.reducer';

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
    this.dataSource = new HotelTableDataSource(this.paginator, this.sort, hotels$);
  }
}
