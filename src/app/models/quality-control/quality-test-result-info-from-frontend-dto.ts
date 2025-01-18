export class QualityTestResultInfoFromFrontendDto {
  orderId: number;
  testResult: boolean;
  productId: number;
  userId: number;
  sampleSize: number;
  maxRejectedSize: number;
  minAcceptedSize: number;
  acceptedSize: number;
  rejectedSize: number;

  constructor(orderId: number, testResult: boolean, productId: number, userId: number,
              sampleSize: number, maxRejectedSize: number, minAcceptedSize: number, acceptedSize: number,
              rejectedSize: number) {
    this.orderId = orderId;
    this.testResult = testResult;
    this.productId = productId;
    this.userId = userId;
    this.sampleSize = sampleSize;
    this.maxRejectedSize = maxRejectedSize;
    this.minAcceptedSize = minAcceptedSize;
    this.acceptedSize = acceptedSize;
    this.rejectedSize = rejectedSize;
  }
}
