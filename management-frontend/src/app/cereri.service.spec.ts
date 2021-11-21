import { TestBed } from '@angular/core/testing';

import { CereriService } from './cereri.service';

describe('CereriService', () => {
  let service: CereriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CereriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
