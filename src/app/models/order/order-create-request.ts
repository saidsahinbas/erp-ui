import {OrderStatus} from "./order-status";
import {OrderType} from "./order-type";

export class OrderCreateRequest {
  orderStatus: OrderStatus;
  description: string;
  supplierId: string;
  orderLineList: OrderLineDto[];
  title: string;
  userId: number;
  warehouseId: number;
  orderType: OrderType;
}

class OrderLineDto {
  quantity: number;
  productId: number;
}
