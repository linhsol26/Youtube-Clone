import { TestBed } from '@angular/core/testing';

import { UserGoogleService } from './user-google.service';

describe('UserGoogleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserGoogleService = TestBed.get(UserGoogleService);
    expect(service).toBeTruthy();
  });
});
