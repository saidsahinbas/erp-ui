import {OrderStatus} from "./order-status";

export class UpdateOrderStatusRequest {
  orderId: number;
  userId: number;
  status: OrderStatus;
}
