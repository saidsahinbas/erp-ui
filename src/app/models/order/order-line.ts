export class OrderLine {
  id!: number; // ID of the order line
  orderId!: number; // Maps to the Order entity's ID
  productId?: number; // Maps to the Product entity's ID
  quantity?: number; // Quantity of the product
  price?: number; // Price of the product
}
