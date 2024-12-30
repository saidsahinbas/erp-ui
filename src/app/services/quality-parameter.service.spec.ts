import { TestBed } from '@angular/core/testing';

import { QualityParameterService } from './quality-parameter.service';

describe('QualityParameterService', () => {
  let service: QualityParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
