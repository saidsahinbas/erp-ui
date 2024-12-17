import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingRequestCreateComponent } from './purchasing-request-create.component';

describe('PurchasingRequestCreateComponent', () => {
  let component: PurchasingRequestCreateComponent;
  let fixture: ComponentFixture<PurchasingRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingRequestCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasingRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
