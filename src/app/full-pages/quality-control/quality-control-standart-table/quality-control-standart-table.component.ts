import { Component, OnInit } from '@angular/core';
import {QualityControlStandartService} from "../../../services/quality-control-standart.service";
import {QualityControlStandard} from "../../../models/quality-control-standart/quality-control-standart";

@Component({
  selector: 'app-quality-control-standart-table',
  templateUrl: './quality-control-standart-table.component.html',
  styleUrls: ['./quality-control-standart-table.component.css']
})
export class QualityControlStandartTableComponent implements OnInit {

  data: QualityControlStandard[];

  constructor(private qualityControlStandartService: QualityControlStandartService) { }

  ngOnInit(): void {
    this.loadAllTableData();
  }

  loadAllTableData() {
    return this.qualityControlStandartService.getAllQualityControlStandart().subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
      }
    )
  }
}
