import {Product} from "../product/product";

export class Supplier {
  id: number; // Unique identifier for the supplier
  name: string; // Supplier's name
  contact: string; // Supplier's contact information
  product?: Product[]; // Optional: List of product IDs associated with the supplier
}
