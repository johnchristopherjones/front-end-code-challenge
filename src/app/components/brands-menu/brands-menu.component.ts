import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Brand } from 'src/app/models/brand.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { getAllBrands, getSelectedBrandIds, getSelectedBrands } from 'src/app/reducers/brand.reducer';
import { SelectBrands } from 'src/app/actions/brand.actions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-brands-menu',
  templateUrl: './brands-menu.component.html',
  styleUrls: ['./brands-menu.component.scss']
})
export class BrandsMenuComponent implements OnInit {
  allBrands$: Observable<Brand[]>;
  selectedBrands$: Observable<Brand[]>;
  selectedBrandIds$: Observable<string[]>;
  menuTitle$: Observable<string>;
  buttonColor$: Observable<string>;
  selection = new SelectionModel<string>(true, []);

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.allBrands$ = this.store.pipe(select(getAllBrands));
    this.selectedBrandIds$ = this.store.pipe(select(getSelectedBrandIds));
    this.selectedBrands$ = this.store.pipe(select(getSelectedBrands));
    this.buttonColor$ = this.selectedBrandIds$.pipe(map(xs => xs.length > 0 ? 'accent' : 'default'));
    this.menuTitle$ = this.selectedBrands$.pipe(map(Brands => {
      switch (Brands.length) {
        case 0: return 'Any Brands';
        case 1: return Brands[0].name;
        default: return `${Brands.length} Brands`;
      }
    }));
    this.selection.changed.subscribe(() => this.store.dispatch(new SelectBrands({ ids: this.selection.selected })));

  }

  isSelected$(id: string): Observable<boolean> {
    return this.selectedBrandIds$.pipe(map(selected => selected.includes(id)));
  }

}
