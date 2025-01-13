export class QualityTestResultInfoFromFrontendDto {
  orderId: number;
  testResult: boolean;
  productId: number;
  userId: number;


  constructor(orderId: number, testResult: boolean, productId: number, userId: number) {
    this.orderId = orderId;
    this.testResult = testResult;
    this.productId = productId;
    this.userId = userId;
  }
}
