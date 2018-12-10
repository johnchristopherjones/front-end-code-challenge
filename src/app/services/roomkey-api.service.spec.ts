import { TestBed } from '@angular/core/testing';

import { RoomkeyApiService } from './roomkey-api.service';

describe('RoomkeyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomkeyApiService = TestBed.get(RoomkeyApiService);
    expect(service).toBeTruthy();
  });
});
