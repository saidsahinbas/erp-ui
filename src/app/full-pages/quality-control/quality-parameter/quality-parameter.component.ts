import { Component, OnInit } from '@angular/core';
import {QualityParameterService} from "../../../services/quality-parameter.service";
import {QualityParameter} from "../../../models/quality-parameter/quality-parameter";
import {patchTsGetExpandoInitializer} from "@angular/compiler-cli/ngcc/src/packages/patch_ts_expando_initializer";
import {ValueType} from "../../../models/quality-parameter/value-type";

@Component({
  selector: 'app-quality-parameter',
  templateUrl: './quality-parameter.component.html',
  styleUrls: ['./quality-parameter.component.css']
})
export class QualityParameterComponent implements OnInit {
  qualityParameters: QualityParameter[] = [];
  newParameter: Partial<QualityParameter> = {
    name: '',
    description: '',
    valueType: undefined, // Correct type for valueType
    defaultValue: '',
    minValue: undefined, // Use undefined for optional fields
    maxValue: undefined
  };
  editingParameter: QualityParameter | null = null;

  constructor(private qualityParameterService: QualityParameterService) {}

  ngOnInit(): void {
    this.loadAllQualityParameters();
  }

  loadAllQualityParameters(): void {
    this.qualityParameterService.getAllQualityParameters().subscribe(
      (response) => {
        this.qualityParameters = response;
      },
      (error) => {
        console.error('Failed to load quality parameters:', error);
      }
    );
  }

  updateValueFields(): void {
    this.newParameter.defaultValue = '';
    this.newParameter.minValue = undefined;
    this.newParameter.maxValue = undefined;
  }

  addParameter(): void {
    if (!this.newParameter.name || !this.newParameter.valueType) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.newParameter.valueType === ValueType.RANGE &&
      (this.newParameter.minValue === undefined || this.newParameter.maxValue === undefined)) {
      alert('Please provide valid range values!');
      return;
    }

    const parameterToSave = { ...this.newParameter };

    if (this.editingParameter) {
      // Edit existing parameter
      Object.assign(this.editingParameter, parameterToSave);
      this.qualityParameterService.createQualityParameter(this.editingParameter).subscribe(
        () => {
          this.loadAllQualityParameters();
          this.resetForm();
        },
        (error) => {
          console.error('Failed to update quality parameter:', error);
        }
      );
    } else {
      // Create new parameter
      this.qualityParameterService.createQualityParameter(parameterToSave as QualityParameter).subscribe(
        () => {
          this.loadAllQualityParameters();
          this.resetForm();
        },
        (error) => {
          console.error('Failed to create quality parameter:', error);
        }
      );
    }
  }

  editParameter(parameter: QualityParameter): void {
    this.newParameter = { ...parameter };
    this.editingParameter = parameter;
  }

  deleteParameter(parameter: QualityParameter): void {
    if (confirm('Are you sure you want to delete this parameter?')) {
      this.qualityParameterService.createQualityParameter(parameter).subscribe(
        () => {
          this.loadAllQualityParameters();
        },
        (error) => {
          console.error('Failed to delete quality parameter:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newParameter = {
      name: '',
      description: '',
      valueType: undefined,
      defaultValue: '',
      minValue: undefined,
      maxValue: undefined
    };
    this.editingParameter = null;
  }
}
