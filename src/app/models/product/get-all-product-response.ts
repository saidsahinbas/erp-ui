export class GetAllProductResponse {
  id: number; // Unique identifier for the product
  productName: string; // Name of the product
  code: string; // Product code
  purchasePrice: number; // Purchase price of the product
  salePrice: number; // Sale price of the product
  description: string; // Description of the product
  categoryName: string; // Name of the category
  productStatuses: string[]; // List of product statuses
  supplierNames: string[]; // List of supplier names
}
