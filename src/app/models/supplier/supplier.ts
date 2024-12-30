import {Product} from "../product/product";
import {City} from "../city/city";
import {Country} from "../country/country";
import {SupplierStatus} from "./supplier-status";
import {Document} from "../document/document";

export class Supplier {
  id: number; // Unique identifier for the supplier
  name: string; // Supplier's name
  email: string; // Supplier's email
  phone: string; // Supplier's phone number
  note: string; // Additional notes for the supplier
  products?: Product[]; // List of products associated with the supplier
  documents: Document[]; // List of documents associated with the supplier
  status: SupplierStatus; // Status of the supplier (e.g., ACTIVE, INACTIVE)
  country: Country; // The country associated with the supplier
  city: City; // The city associated with the supplier
}
