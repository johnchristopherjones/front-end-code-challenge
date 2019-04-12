import { Component } from '@angular/core';
import { SearchFormService } from 'src/app/services/search-form.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  constructor(public service: SearchFormService) {}

  selected({ option: { value: { id }}}) {
    this.service.gotoHotelsPage(id);
  }

}
