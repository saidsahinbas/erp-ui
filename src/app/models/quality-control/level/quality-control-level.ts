import {Level} from "./level";

export class QualityControlLevel {
  id: number;
  partAMin: number;
  partAMax: number;
  levelName: Level; // Use the corresponding enum if available
  sampleSize: number;
  acceptedLimit: number;
  rejectedLimit: number;
}
