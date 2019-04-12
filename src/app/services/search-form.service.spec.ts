import { TestBed } from '@angular/core/testing';

import { SearchFormService } from './search-form.service';

describe('SearchFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFormService = TestBed.get(SearchFormService);
    expect(service).toBeTruthy();
  });
});
