import { TestBed } from '@angular/core/testing';

import { VideoUrlService } from './video-url.service';

describe('VideoUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoUrlService = TestBed.get(VideoUrlService);
    expect(service).toBeTruthy();
  });
});
