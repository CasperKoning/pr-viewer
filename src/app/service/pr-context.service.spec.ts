import { TestBed } from '@angular/core/testing';

import { PrContextService } from './pr-context.service';

describe('PrContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrContextService = TestBed.get(PrContextService);
    expect(service).toBeTruthy();
  });
});
