import {Warehouse} from "../warehouse/warehouse";

export class CreateStockRequest {
  billNumber: number;
  warehouse: Warehouse;
  productDetails: ProductDetailDto[];
}

class ProductDetailDto {
  productId: number;
  quantity: number;
  criticalLevel: number;
  supplierName: string;
}
