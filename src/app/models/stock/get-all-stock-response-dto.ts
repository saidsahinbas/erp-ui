import {StockStatus} from "./stock";

export class GetAllStockResponseDto {
  id: number;
  billNumber: string;
  warehouseName: string;
  productName: string;
  quantity: number;
  criticalLevel: number;
  supplierName: string;
  status: StockStatus;
  categoryName: string;
}
