import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationPageComponent } from './components/location-page/location-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'locations'
  },
  {
    path: 'locations',
    component: LocationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
