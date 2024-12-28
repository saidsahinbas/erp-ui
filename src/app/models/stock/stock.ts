import {ProductSupplier} from "../productSupplier/product-supplier";
import {Warehouse} from "../warehouse/warehouse";

export class Stock {
  id: number;
  productSupplier: ProductSupplier;
  warehouse: Warehouse;
  quantity: number;
  criticalLevel: number;
  status: StockStatus;
  lastUpdated: Date;
}

export enum StockStatus {
  NORMAL= 'normal',
  CRITICAL='critical',
  OUT_OF_STOCK='outOfStock'
}
