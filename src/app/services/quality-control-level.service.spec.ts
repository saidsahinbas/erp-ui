import { TestBed } from '@angular/core/testing';

import { QualityControlLevelService } from './quality-control-level.service';

describe('QualityControlLevelService', () => {
  let service: QualityControlLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityControlLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
