import { Component, OnInit } from '@angular/core';
import { SearchFormService } from 'src/app/services/search-form.service';

@Component({
  selector: 'app-location-search-bar',
  templateUrl: './location-search-bar.component.html',
  styleUrls: ['./location-search-bar.component.scss']
})
export class LocationSearchBarComponent {

  constructor(public service: SearchFormService) {}

  selected({ option: { value: { id }}}) {
    this.service.gotoHotelsPage(id);
  }

}
