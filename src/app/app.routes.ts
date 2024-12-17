import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './full-pages/home/home.component';
import { UserAuthorityCreateComponent } from './full-pages/user-authority/user-authority-create/user-authority-create.component';
import { UserAuthorityListComponent } from './full-pages/user-authority/user-authority-list/user-authority-list.component';
import {LoginComponent} from "./full-pages/auth/login/login.component";
import {UserCreateComponent} from "./full-pages/user-authority/user-create/user-create.component";
import {UserEditComponent} from "./full-pages/user-authority/user-edit/user-edit.component";
import {ProductListComponent} from "./full-pages/product/product-list/product-list.component";
import {ProductDetailComponent} from "./full-pages/product/product-detail/product-detail.component";
import {ProductCreateComponent} from "./full-pages/product/product-create/product-create.component";
import {StockCreateComponent} from "./full-pages/stock/stock-create/stock-create.component";
import {StockManagementComponent} from "./full-pages/stock/stock-management/stock-management.component";
import * as path from "path";
import {SupplierListComponent} from "./full-pages/supplier/supplier-list/supplier-list.component";
import {SupplierPerformanceComponent} from "./full-pages/supplier/supplier-performance/supplier-performance.component";
import {SupplierCreateComponent} from "./full-pages/supplier/supplier-create/supplier-create.component";
import {
  PurchasingRequestCreateComponent
} from "./full-pages/purchasing/purchasing-request-create/purchasing-request-create.component";
import {
  PurchasingRequestApprovalComponent
} from "./full-pages/purchasing/purchasing-request-approval/purchasing-request-approval.component";
import {
  QualityControlTestResultsComponent
} from "./full-pages/quality-control/quality-control-test-results/quality-control-test-results.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: ':id', component: ProductDetailComponent },
    ]
  },
  { path: 'stocks',
    children: [
      { path: 'create', component: StockCreateComponent },
      { path: 'management', component: StockManagementComponent },
    ]
  },
  {
    path: 'suppliers',
    children: [
      { path: '', component: SupplierListComponent },
      { path: 'performance', component: SupplierPerformanceComponent },
      { path: 'create', component: SupplierCreateComponent },
    ]
  },
  {
    path: 'purchase',
    children: [
      { path: 'create', component: PurchasingRequestCreateComponent },
      { path: 'approval', component: PurchasingRequestApprovalComponent },
    ]
  },
  { path: 'quality', component: QualityControlTestResultsComponent },
  { path: 'add-user', component: UserCreateComponent },
  { path: 'manage-user', component: UserEditComponent },
  { path: 'user-authority-create', component: UserAuthorityCreateComponent },
  { path: 'user-authority-list', component: UserAuthorityListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
