import { TestBed } from '@angular/core/testing';

import { ConfirmareService } from './confirmare.service';

describe('ConfirmareService', () => {
  let service: ConfirmareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
