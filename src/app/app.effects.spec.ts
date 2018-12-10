import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { AppEffects } from './app.effects';
import { getEffectsMetadata, EffectsMetadata, Actions } from '@ngrx/effects';
import { RoomkeyApiService } from './services/roomkey-api.service';
import { SearchLocations, LocationActions } from './actions/location.actions';
import { LoadAutofillAirports } from './actions/autofill-airport.actions';
import { LoadAutofillLocations } from './actions/autofill-location.actions';
import { Observable, of } from 'rxjs';

describe('AppEffects', () => {
  let actions$: Observable<LocationActions>;
  let effects: AppEffects;
  let metadata: EffectsMetadata<AppEffects>;
  let api: jasmine.SpyObj<RoomkeyApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        {
          provide: RoomkeyApiService,
          useValue: jasmine.createSpyObj('api', ['autofill'])
        }
      ]
    });

    effects = TestBed.get(AppEffects);
    metadata = getEffectsMetadata(effects);
    api = TestBed.get(RoomkeyApiService);
  });

  afterEach(() => {
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  describe('Effects Metadata', () => {
    // Effects Metadata just describes the decorators applied to effects.
    // This really just checks that (a) you have decorated your effects and
    // (b) have correctly indicated that they should or should not dispatch
    // an action themselves. The later is a decent sanity check, since you might
    // disable dispatch while developing an Effect.
    it('should register searchLocation$ that dispatches an action', () => {
      expect(metadata.searchLocations$).toEqual({ dispatch: true });
    });
  });

  describe('searchLocations$', () => {
    // Not testing effects yet.  For a game plan, see:
    // https://github.com/ngrx/platform/blob/master/docs/effects/testing.md
    xit('should dispatch after successful API response', () => {
      // Test should work something like this, but there's some confounding subtltey.
      // Set up inputs and expected results
      const searchTerm = 'National';
      const searchAction = new SearchLocations({ searchTerm });
      const completionActions = [
        new LoadAutofillLocations({ autofillLocations: [] }),
        new LoadAutofillAirports({ autofillAirports: [] })
      ] as [LoadAutofillLocations, LoadAutofillAirports];

      // Expected input stream and result
      const source = hot('--a-', { a: searchAction });
      api.autofill.and.returnValue(of({
        query: searchTerm,
        airports: completionActions[1].payload.autofillAirports,
        locations: completionActions[0].payload.autofillLocations
      }));
      // tslint:disable-next-line:no-shadowed-variable
      const effects = new AppEffects(new Actions(source), api);
      const expected = cold('--bc', { b: completionActions[0], c: completionActions[1] });

      // expect(api.autofill).toHaveBeenCalled();

      // The input stream should result in an HTTP request we want to mock
      // const req = httpMock.expectOne(AUTOFILL_URI);
      // req.flush({ query: searchTerm, locations: [], airports: [] });

      // Finally, test that the effect results in the expected output
      expect(effects.searchLocations$({ debounce: 1 })).toBeObservable(expected);
    });
  });
});
