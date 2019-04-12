import { Component } from '@angular/core';
import { SearchFormService } from 'src/app/services/search-form.service';

@Component({
  selector: 'app-location-search-box',
  templateUrl: './location-search-box.component.html',
  styleUrls: ['./location-search-box.component.scss']
})
export class LocationSearchBoxComponent {
  constructor(public service: SearchFormService) {}

  selected({ option: { value: { id }}}) {
    this.service.gotoHotelsPage(id);
  }
}
