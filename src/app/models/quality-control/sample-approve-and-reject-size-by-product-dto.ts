import {Level} from "./level/level";

export class SampleApproveAndRejectSizeByProductDto {
  productId: number;
  productName: string;
  sampleSize: number;
  approveSize: number;
  rejectSize: number;
  productQuantity: number;
  supplierLevel: Level;
  qualityParameters: QualityParameterDto[];
}

export interface QualityParameterDto {
  id: number;
  name: string;
  description: string;
  valueType: string;
  defaultValue: string;
  minValue: string;
  maxValue: string;
}
