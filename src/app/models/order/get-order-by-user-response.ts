import {OrderStatus} from "./order-status";

export class GetOrderByUserResponse {
  orderId: number;
  orderTitle: string;
  orderStatus: OrderStatus;
  orderUser: string;
  orderDate: Date;
  price: number;
}
