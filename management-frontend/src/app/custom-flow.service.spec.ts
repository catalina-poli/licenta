import { TestBed } from '@angular/core/testing';

import { CustomFlowService } from './custom-flow.service';

describe('CustomFlowService', () => {
  let service: CustomFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
