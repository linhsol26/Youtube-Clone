import { TestBed } from '@angular/core/testing';

import { LikeDislikeService } from './like-dislike.service';

describe('LikeDislikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikeDislikeService = TestBed.get(LikeDislikeService);
    expect(service).toBeTruthy();
  });
});
