import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityParameterComponent } from './quality-parameter.component';

describe('QualityParameterComponent', () => {
  let component: QualityParameterComponent;
  let fixture: ComponentFixture<QualityParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
