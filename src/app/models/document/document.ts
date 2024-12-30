import {Product} from "../product/product";
import {Supplier} from "../supplier/supplier";

export class Document {
  id: number; // Unique identifier for the document
  name: string; // Name of the document
  content: string | ArrayBuffer; // Content of the document (Base64 encoded or binary format)
  type: DocumentType; // Type of the document (e.g., PDF, IMAGE, etc.)
  supplier?: Supplier; // The supplier associated with the document (optional)
  product?: Product; // The product associated with the document (optional)
}
