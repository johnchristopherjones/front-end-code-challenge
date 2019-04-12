import { DataSource } from '@angular/cdk/collections';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/app/models/hotel.model';
import { Rate } from 'src/app/models/rate.model';
import { Dictionary } from '@ngrx/entity';

/**
 * Data source for the HotelTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HotelGridDataSource extends DataSource<[Hotel, Rate]> {
  constructor(
    private hotels: Observable<Hotel[]>,
    private amenityIds: Observable<string[]>,
    private brandIds: Observable<string[]>,
    private rates: Observable<Dictionary<Rate>>
  ) {
    super();
  }

  /**
   * Called to connect this data source to the table. The table will only update
   * when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<[Hotel, Rate][]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.hotels,
      this.amenityIds,
      this.brandIds,
      this.rates
    ];

    return combineLatest(...dataMutations).pipe(
      map(([hotels, amenityIds, brandIds, rates]) => {
        return this.getFilteredData([...hotels], amenityIds, brandIds, rates);
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  private getFilteredData(data: Hotel[], amendityCodes: string[], brandIds: string[], rates: Dictionary<Rate>): [Hotel, Rate][] {
    const amenitySet = new Set(amendityCodes);
    const brandSet = new Set(brandIds);

    const includebyValidRate = ({ udicode }: Hotel) =>
      [udicode, 'amount', 'segments', 0].reduce((obj: any, k) => obj && obj[k], rates);
    const includeByAmenity = ({ amenities }: Hotel ) =>
      amenitySet.size === 0
      || amendityCodes.every(id => !!amenities.find(({ code }) => id === code));
    const includeByBrands = ({ brand }: Hotel) => brandSet.size === 0 || brandSet.has(brand && brand.id);
    return data.filter(hotel => includebyValidRate(hotel) && includeByAmenity(hotel) && includeByBrands(hotel))
      .map(hotel => [hotel, rates[hotel.udicode]] as [Hotel, Rate]);
  }
}
