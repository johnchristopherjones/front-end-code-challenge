import { TestBed } from '@angular/core/testing';

import { RoomkeyApiService } from './roomkey-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomkeyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: RoomkeyApiService = TestBed.get(RoomkeyApiService);
    expect(service).toBeTruthy();
  });
});
