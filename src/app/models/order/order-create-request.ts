import {OrderStatus} from "./order-status";
import {OrderType} from "./order-type";

export class OrderCreateRequest {
  orderStatus: OrderStatus;
  description: string;
  supplierId: string;
  orderLineDtoList: OrderLineDtoList[];
  title: string;
  userId: number;
  warehouseId: number;
  orderType: OrderType;
}

class OrderLineDtoList {
  quantity: number;
  productId: number;
}
