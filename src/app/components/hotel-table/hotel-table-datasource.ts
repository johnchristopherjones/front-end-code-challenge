import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, withLatestFrom, startWith } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { Hotel } from 'src/app/models/hotel.model';
import { Amenity } from 'src/app/models/amenity.model';

// TODO: Replace this with your own data model type
type HotelTableItem = Hotel;

/**
 * Data source for the HotelTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HotelTableDataSource extends DataSource<HotelTableItem> {
  length = 0;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private hotels: Observable<Hotel[]>,
    private amenityIds: Observable<string[]>,
    private brandIds: Observable<string[]>
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<HotelTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange,
      this.hotels,
      this.amenityIds,
      this.brandIds
    ];

    return merge(...dataMutations).pipe(
      withLatestFrom(this.hotels, this.amenityIds, this.brandIds),
      map(([_, hotels, amenityIds, brandIds]) => {
        this.paginator.length = hotels.length;
        return this.getPagedData(this.getFilteredData(this.getSortedData([...hotels]), amenityIds, brandIds));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: HotelTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: HotelTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

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


/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
