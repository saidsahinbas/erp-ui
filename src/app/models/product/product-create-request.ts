import {ProductStatus} from "./product-status";

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
}
