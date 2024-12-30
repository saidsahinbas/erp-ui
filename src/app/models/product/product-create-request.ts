import {ProductStatus} from "./product-status";
import {Document} from "../document/document";
import {QualityParameter} from "../quality-parameter/quality-parameter";

export class ProductCreateRequest {
  name: string;
  code: string;
  purchasePrice:number;
  salePrice: number;
  description: string;
  categoryId: number;
  supplierId: number[];
  image1: string;
  image2: string;
  productStatuses: string[];
  documents: Document[];
  qualityParameterDtoSet: QualityParameter[];
}
