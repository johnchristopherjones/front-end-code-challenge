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
    children: [
      {
        path: ':locationId',
        component: LocationDetailsComponent,
        children: [
          {
            path: 'hotels',
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
