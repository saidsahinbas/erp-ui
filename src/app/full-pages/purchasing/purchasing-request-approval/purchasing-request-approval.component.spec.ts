import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingRequestApprovalComponent } from './purchasing-request-approval.component';

describe('PurchasingRequestApprovalComponent', () => {
  let component: PurchasingRequestApprovalComponent;
  let fixture: ComponentFixture<PurchasingRequestApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingRequestApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
