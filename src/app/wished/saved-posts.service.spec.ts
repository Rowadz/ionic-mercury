import { TestBed } from '@angular/core/testing';

import { SavedPostsService } from './saved-posts.service';

describe('SavedPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedPostsService = TestBed.get(SavedPostsService);
    expect(service).toBeTruthy();
  });
});
