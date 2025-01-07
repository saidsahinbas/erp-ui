import { TestBed } from '@angular/core/testing';

import { QualityControlStandartService } from './quality-control-standart.service';

describe('QualityControlStandartService', () => {
  let service: QualityControlStandartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityControlStandartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
