import { TestBed } from '@angular/core/testing';

import { CategorieSablonService } from './categorie-sablon.service';

describe('CategorieSablonService', () => {
  let service: CategorieSablonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieSablonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
