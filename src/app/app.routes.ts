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
import {AuthGuard} from "./auth.guard";
import {UserDetailComponent} from "./full-pages/user-authority/user-detail/user-detail.component";
import {
  UserAuthorityDetailComponent
} from "./full-pages/user-authority/user-authority-detail/user-authority-detail.component";
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: ProductCreateComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'stocks',
    children: [
      { path: 'create', component: StockCreateComponent, canActivate: [AuthGuard] },
      { path: 'management', component: StockManagementComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers',
    children: [
      { path: '', component: SupplierListComponent, canActivate: [AuthGuard] },
      { path: 'performance', component: SupplierPerformanceComponent, canActivate: [AuthGuard] },
      { path: 'create', component: SupplierCreateComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'purchase',
    children: [
      { path: 'create', component: PurchasingRequestCreateComponent, canActivate: [AuthGuard] },
      { path: 'approval', component: PurchasingRequestApprovalComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'quality', component: QualityControlTestResultsComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'manage-user', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'user-authority-create', component: UserAuthorityCreateComponent, canActivate: [AuthGuard] },
  { path: 'user-authority-list', component: UserAuthorityListComponent, canActivate: [AuthGuard] },
  { path: 'user-authority-detail/:id', component: UserAuthorityDetailComponent, canActivate: [AuthGuard] },
  { path: 'user-detail', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
