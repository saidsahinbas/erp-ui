// Ortak özellikler
interface BaseResponse {
  sample_size: number;
  success_sample_size: number;
  total_success_order_count: number;
  total_order_count: number;
  predicted_label: string;
  probabilities: string;
}

// Supplier-based Response
export interface SupplierResponse extends BaseResponse {
  supplier_name: string;
}

// Consolidated Metrics Response
export interface ConsolidatedResponse extends BaseResponse {
  order_status_1: number;
  order_status_2: number;
  order_status_3: number;
}

// Product-based Response
export interface ProductResponse extends BaseResponse {
  product_name: string;
}

// Tüm Response'ları tek bir tipte birleştirebiliriz
export type PredictionResponse = SupplierResponse | ConsolidatedResponse | ProductResponse;
