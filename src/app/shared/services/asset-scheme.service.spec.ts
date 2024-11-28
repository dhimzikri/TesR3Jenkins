import { TestBed } from '@angular/core/testing';

import { AssetSchemeService } from './asset-scheme.service';

describe('AssetSchemeService', () => {
  let service: AssetSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
