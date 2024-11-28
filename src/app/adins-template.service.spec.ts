import { TestBed } from '@angular/core/testing';

import { AdinsTemplateService } from './adins-template.service';

describe('AdinsTemplateService', () => {
  let service: AdinsTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdinsTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
