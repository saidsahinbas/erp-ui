import { TestBed } from '@angular/core/testing';

import { ProductSupplierService } from './product-supplier.service';

describe('ProductSupplierServiceService', () => {
  let service: ProductSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
