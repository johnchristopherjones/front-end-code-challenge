import { DataSource } from '@angular/cdk/collections';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hotel } from 'src/app/models/hotel.model';

// TODO: Replace this with your own data model type
type HotelTableItem = Hotel;

/**
 * Data source for the HotelTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HotelGridDataSource extends DataSource<HotelTableItem> {
  constructor(
    private hotels: Observable<Hotel[]>,
    private amenityIds: Observable<string[]>,
    private brandIds: Observable<string[]>
  ) {
    super();
  }

  /**
   * Called to connect this data source to the table. The table will only update
   * when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HotelTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.hotels,
      this.amenityIds,
      this.brandIds
    ];

    return combineLatest(...dataMutations).pipe(
      map(([hotels, amenityIds, brandIds]) => {
        return this.getFilteredData([...hotels], amenityIds, brandIds);
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  private getFilteredData(data: Hotel[], amendityCodes: string[], brandIds: string[]): Hotel[] {
    const amenitySet = new Set(amendityCodes);
    const brandSet = new Set(brandIds);

    const includeByAmenity = ({ amenities }: Hotel ) =>
      amenitySet.size === 0
      || amendityCodes.every(id => !!amenities.find(({ code }) => id === code));
    const includeByBrands = ({ brand }: Hotel) => brandSet.size === 0 || brandSet.has(brand && brand.id);
    return data.filter(hotel => includeByAmenity(hotel) && includeByBrands(hotel));
  }
}
