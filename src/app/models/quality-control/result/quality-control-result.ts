import {QualityResultStatus} from "./quality-result-status";

export class QualityControlResult {
  id: number;
  orderId: number; // To store the related order's ID
  status: QualityResultStatus; // Use the corresponding enum if available
  createdAt: Date;
  updatedAt: Date;
}
