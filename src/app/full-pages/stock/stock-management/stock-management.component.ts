import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../services/stock.service";
import {Stock} from "../../../models/stock/stock";

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css']
})
export class StockManagementComponent implements OnInit {

  stocks: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadAllStocks();
  }

  loadAllStocks() {
    this.stockService.getAllStocks().subscribe((res) => {
      this.stocks = res;
      console.log(this.stocks);
    })
  }
}
