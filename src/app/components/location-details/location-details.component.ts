import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SelectLocation } from 'src/app/actions/location.actions';
import { State } from 'src/app/reducers';
import { getSelectedLocationId, getSelectedLocation } from 'src/app/reducers/location.reducer';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { Geometry } from 'src/app/models/geometry.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  locationDetails$: Observable<Location>;
  geometry$: Observable<Geometry>;
  fullName$: Observable<string>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    // Dispatch SelectLocation if a location is not already selected.
    // TODO: move to router
    const { locationId } = this.route.snapshot.params;
    if (locationId) {
      this.store.pipe(
        select(getSelectedLocationId),
        filter(id => locationId && id !== locationId)
      ).subscribe(() => this.store.dispatch(new SelectLocation({ id: locationId })));
    }

    this.locationDetails$ = this.store.pipe(select(getSelectedLocation), filter(v => v && !!v.geometry));
    this.geometry$ = this.locationDetails$.pipe(map(({ geometry }) => geometry));
    this.fullName$ = this.locationDetails$.pipe(map(({ full_name }) => full_name));
  }

}
