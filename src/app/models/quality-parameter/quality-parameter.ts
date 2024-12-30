import {Product} from "../product/product";
import {ValueType} from "./value-type";

export class QualityParameter {
  id: number;
  name: string;
  description: string;
  valueType: ValueType;
  minValue: number;
  maxValue: number;
  defaultValue: string;
  product: Product;
}
