export class SupplierOrder {
  id: number; // Unique identifier for the supplier order
  supplier: any; // Supplier object or reference
  product: any; // Product object or reference
  quantity: number; // Quantity of the product in the order
  totalTestRate: number; // Total test rate
  createdAt: Date; // Creation date of the order
  sampleSize: number; // Number of samples in the order
  maxRejectedSize: number; // Maximum rejected size for the sample
  minAcceptedSize: number; // Minimum accepted size for the sample
  acceptedSize: number; // Accepted size for the sample
  rejectedSize: number; // Rejected size for the sample
  status: string; // Status of the order (Enum as a string)
  totalOrderCount: number; // Total number of orders
  totalOrderAcceptedCount: number; // Total number of accepted orders
  totalOrderRejectedCount: number; // Total number of rejected orders

  constructor(data?: Partial<SupplierOrder>) {
    this.id = data?.id || 0;
    this.supplier = data?.supplier || null;
    this.product = data?.product || null;
    this.quantity = data?.quantity || 0;
    this.totalTestRate = data?.totalTestRate || 0;
    this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
    this.sampleSize = data?.sampleSize || 0;
    this.maxRejectedSize = data?.maxRejectedSize || 0;
    this.minAcceptedSize = data?.minAcceptedSize || 0;
    this.acceptedSize = data?.acceptedSize || 0;
    this.rejectedSize = data?.rejectedSize || 0;
    this.status = data?.status || '';
    this.totalOrderCount = data?.totalOrderCount || 0;
    this.totalOrderAcceptedCount = data?.totalOrderAcceptedCount || 0;
    this.totalOrderRejectedCount = data?.totalOrderRejectedCount || 0;
  }
}
