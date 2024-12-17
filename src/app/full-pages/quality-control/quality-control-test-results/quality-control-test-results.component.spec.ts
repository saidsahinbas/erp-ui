import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityControlTestResultsComponent } from './quality-control-test-results.component';

describe('QualityControlTestResultsComponent', () => {
  let component: QualityControlTestResultsComponent;
  let fixture: ComponentFixture<QualityControlTestResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityControlTestResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityControlTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
