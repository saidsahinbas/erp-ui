export class GetProductsBySupplier {
  supplierId: number;
  supplierName: string;

  products: ProductList[];
}

export class ProductList {
  productId: number;
  productName: string;
  purchasePrice: number;
  salePrice: number;
  categoryName: string;
}
