import {OrderLine} from "./order-line";
import {OrderStatus} from "./order-status";
import {OrderType} from "./order-type";

export class Order {
  id!: number; // Maps to Integer in Java
  orderTitle?: string; // Maps to String in Java
  userId?: number; // Maps to the User entity's ID (Lazy loaded)
  creationDate?: string; // Maps to Instant in Java (Use ISO-8601 string)
  warehouseId?: number; // Maps to the Warehouse entity's ID (Lazy loaded)
  description?: string; // Maps to String in Java
  supplierId?: number; // Maps to the Supplier entity's ID (Lazy loaded)
  orderStatus?: OrderStatus; // Maps to Enum OrderStatus in Java
  orderType?: OrderType; // Maps to Enum OrderType in Java
  orderLineList?: OrderLine[]; // Maps to List<OrderLine> in Java
  price?: number; // Maps to BigDecimal in Java
}


