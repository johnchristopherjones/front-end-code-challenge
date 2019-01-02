import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectAmenities } from 'src/app/actions/amenity.actions';
import { Amenity } from 'src/app/models/amenity.model';
import { State } from 'src/app/reducers';
import { getAllAmenities, getPopularAmenities, getSelectedAmenityIds, getSelectedAmenities } from 'src/app/reducers/amenity.reducer';

const amenitiesTitles = {
  0: () => 'Any amenities',
  1: ([amenity]) => amenity.name,
  default: amenities => `${amenities.length} amenities`
};

@Component({
  selector: 'app-amenities-menu',
  templateUrl: './amenities-menu.component.html',
  styleUrls: ['./amenities-menu.component.scss']
})
export class AmenitiesMenuComponent implements OnInit {
  allAmenities$: Observable<Amenity[]>;
  popularAmenities$: Observable<Amenity[]>;
  selectedAmenities$: Observable<Amenity[]>;
  selectedAmenityIds$: Observable<string[]>;
  menuTitle$: Observable<string>;
  selection = new SelectionModel<string>(true, []);

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.allAmenities$ = this.store.pipe(select(getAllAmenities));
    this.popularAmenities$ = this.store.pipe(select(getPopularAmenities));
    this.selectedAmenityIds$ = this.store.pipe(select(getSelectedAmenityIds));
    this.selectedAmenities$ = this.store.pipe(select(getSelectedAmenities));
    this.menuTitle$ = this.selectedAmenities$.pipe(map(amenities => {
      switch (amenities.length) {
        case 0: return 'Any amenities';
        case 1: return amenities[0].name;
        default: return `${amenities.length} amenities`;
      }
    }));
    this.selection.changed.subscribe(() => this.store.dispatch(new SelectAmenities({ ids: this.selection.selected })));

  }

  isSelected$(code: string): Observable<boolean> {
    return this.selectedAmenityIds$.pipe(map(selected => selected.includes(code)));
  }

}
