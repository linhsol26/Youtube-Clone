import { TestBed } from '@angular/core/testing';

import { MiniPlayerService } from './mini-player.service';

describe('MiniPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiniPlayerService = TestBed.get(MiniPlayerService);
    expect(service).toBeTruthy();
  });
});
