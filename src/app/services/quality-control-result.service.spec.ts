import { TestBed } from '@angular/core/testing';

import { QualityControlResultService } from './quality-control-result.service';

describe('QualityControlResultService', () => {
  let service: QualityControlResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityControlResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
