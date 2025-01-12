import { Component, OnInit } from '@angular/core';
import {QualityControlLevelService} from "../../../services/quality-control-level.service";
import {QualityControlLevel} from "../../../models/quality-control/level/quality-control-level";

interface GroupedData {
  partAMin: number;
  partAMax: number;
  level1?: QualityControlLevel;
  level2?: QualityControlLevel;
  level3?: QualityControlLevel;
  level4?: QualityControlLevel;
}

@Component({
  selector: 'app-quality-control-standart-table',
  templateUrl: './quality-control-standart-table.component.html',
  styleUrls: ['./quality-control-standart-table.component.css']
})
export class QualityControlStandartTableComponent implements OnInit {
  data: QualityControlLevel[] = [];
  groupedData: GroupedData[] = [];

  constructor(private qualityControlLevelService: QualityControlLevelService) { }

  ngOnInit(): void {
    this.loadAllTableData();
  }

  loadAllTableData() {
    this.qualityControlLevelService.getTable().subscribe({
      next: (res) => {
        console.log('Raw data:', res); // Debug için
        this.data = res;
        this.groupData();
        console.log('Grouped data:', this.groupedData); // Debug için
      },
      error: (err) => {
        console.error('Error loading data:', err);
      }
    });
  }

  private groupData() {
    // Önce partAMin değerlerine göre sıralayalım
    const sortedData = [...this.data].sort((a, b) => a.partAMin - b.partAMin);

    // Gruplama işlemi
    const grouped = new Map<string, GroupedData>();

    sortedData.forEach(item => {
      const key = `${item.partAMin}-${item.partAMax}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          partAMin: item.partAMin,
          partAMax: item.partAMax,
          level1: undefined,
          level2: undefined,
          level3: undefined,
          level4: undefined
        });
      }

      const currentGroup = grouped.get(key)!;

      switch (item.levelName) { // levelName kullanıyoruz, level değil
        case 'LEVEL_1':
          currentGroup.level1 = item;
          break;
        case 'LEVEL_2':
          currentGroup.level2 = item;
          break;
        case 'LEVEL_3':
          currentGroup.level3 = item;
          break;
        case 'LEVEL_4':
          currentGroup.level4 = item;
          break;
      }
    });

    this.groupedData = Array.from(grouped.values());
  }
}
