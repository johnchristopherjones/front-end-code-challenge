import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { HotelTableComponent } from './components/hotel-table/hotel-table.component';
import { HotelGridComponent } from './components/hotel-grid/hotel-grid.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'locations'
  },
  {
    path: 'locations',
    component: LocationPageComponent,
  },
  {
    path: 'locations/:locationId/hotels',
    component: LocationPageComponent,
    children: [
      {
        path: '',
        component: LocationDetailsComponent,
        children: [
          {
            path: '',
            component: HotelGridComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
