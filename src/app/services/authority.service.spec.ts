import { TestBed } from '@angular/core/testing';

import { AuthorityService } from './authority.service';

describe('AuthorityServiceService', () => {
  let service: AuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
