import { TestBed } from '@angular/core/testing';

import { AnunturiService } from './anunturi.service';

describe('AnunturiService', () => {
  let service: AnunturiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnunturiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
