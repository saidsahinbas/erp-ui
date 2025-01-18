import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../../services/supplier.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {




  constructor(private supplierService: SupplierService,
              private router: Router) { }

  ngOnInit(): void {
  }



}
