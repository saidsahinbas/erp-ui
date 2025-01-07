import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlDetailComponent } from './quality-control-detail.component';

describe('QualityControlDetailComponent', () => {
  let component: QualityControlDetailComponent;
  let fixture: ComponentFixture<QualityControlDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityControlDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
