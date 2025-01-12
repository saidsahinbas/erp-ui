import { Component, OnInit } from '@angular/core';
import {QualityControlResultService} from "../../../services/quality-control-result.service";
import {Router} from "@angular/router";
import {QualityControlResultList} from "../../../models/quality-control/result/quality-control-result-list";

@Component({
  selector: 'app-quality-control-test-results',
  templateUrl: './quality-control-test-results.component.html',
  styleUrls: ['./quality-control-test-results.component.css']
})
export class QualityControlTestResultsComponent implements OnInit {

  allResults: QualityControlResultList[];

  constructor(private qualityControlResultService: QualityControlResultService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadAllResults();
  }

  loadAllResults(): void {
    this.qualityControlResultService.getAllResults().subscribe((res) => {
      this.allResults = res;
      console.log(this.allResults);
    })
  }
}
