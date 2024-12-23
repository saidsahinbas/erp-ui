import {Supplier} from "../supplier/supplier";
import {ProductStatus} from "./product-status";

export class Product {
  id: number; // Unique identifier for the product
  productName: string; // Product name
  code: string; // Product code
  purchasePrice: number; // Purchase price (BigDecimal -> number)
  salePrice: number; // Sale price (BigDecimal -> number)
  description: string; // Description of the product
  categoryId: number; // Associated category ID
  image1?: string; // Base64 string for image 1
  image2?: string; // Base64 string for image 2
  suppliers: Supplier[]; // List of associated suppliers
  productStatuses: ProductStatus[]; // Enum values for product statuses
}
