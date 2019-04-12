import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { LocationSearchBoxComponent } from './components/location-search-box/location-search-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoomkeyApiInterceptor } from './services/roomkey-api.interceptor';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { AmenitiesMenuComponent } from './components/amenities-menu/amenities-menu.component';
import { BrandsMenuComponent } from './components/brands-menu/brands-menu.component';
import { HotelTableComponent } from './components/hotel-table/hotel-table.component';
import { HotelGridComponent } from 'src/app/components/hotel-grid/hotel-grid.component';
import { HotelGridCellComponent } from 'src/app/components/hotel-grid-cell/hotel-grid-cell.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AmenitiesIconListComponent } from './components/amenities-icon-list/amenities-icon-list.component';
import { AmenitiesIconListItemComponent } from './components/amenities-icon-list-item/amenities-icon-list-item.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './custom-route-serializer';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LocationSearchBarComponent } from './components/location-search-bar/location-search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LocationPageComponent,
    LocationSearchBoxComponent,
    LocationDetailsComponent,
    AmenitiesMenuComponent,
    BrandsMenuComponent,
    HotelTableComponent,
    HotelGridComponent,
    HotelGridCellComponent,
    AmenitiesIconListComponent,
    AmenitiesIconListItemComponent,
    SearchPageComponent,
    LocationSearchBarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    ScrollingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RoomkeyApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
