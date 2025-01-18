import {SupplierOrder} from "./supplier-order";

export class SupplierOrderFilteredResponseDto {
  supplierOrder: SupplierOrder;
  supplierId: number;
  supplierName: string;
  productId: number;
  productName: string;
  orderId: number;
}
