import { TestBed } from '@angular/core/testing';

import { AnimeApiService } from './anime-api.service';

describe('AnimeApiService', () => {
  let service: AnimeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
