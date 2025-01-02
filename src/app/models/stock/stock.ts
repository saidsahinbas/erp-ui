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
  NORMAL = 'NORMAL',
  CRITICAL = 'CRITICAL',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}
