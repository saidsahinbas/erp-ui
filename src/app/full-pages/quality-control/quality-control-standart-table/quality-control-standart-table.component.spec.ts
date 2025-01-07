import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlStandartTableComponent } from './quality-control-standart-table.component';

describe('QualityControlStandartTableComponent', () => {
  let component: QualityControlStandartTableComponent;
  let fixture: ComponentFixture<QualityControlStandartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityControlStandartTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlStandartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
