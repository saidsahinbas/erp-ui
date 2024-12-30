import {City} from "../city/city";
import {Country} from "../country/country";
import {SupplierStatus} from "./supplier-status";

export class CreateSupplier {
  name: string; // Supplier's name
  email: string; // Supplier's email
  phone: string; // Supplier's phone number
  note: string; // Additional notes for the supplier
  status: SupplierStatus; // Status of the supplier (e.g., ACTIVE, INACTIVE)
  country: Country; // Country associated with the supplier
  city: City; // City associated with the supplier
}
