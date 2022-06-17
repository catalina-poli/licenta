import { TestBed } from '@angular/core/testing';

import { EsSearchService } from './es-search.service';

describe('EsSearchService', () => {
  let service: EsSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
