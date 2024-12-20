import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {
  UserAuthorityListComponent
} from './full-pages/user-authority/user-authority-list/user-authority-list.component';
import {
  UserAuthorityCreateComponent
} from './full-pages/user-authority/user-authority-create/user-authority-create.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {routes} from './app.routes'
import {HomeComponent} from './full-pages/home/home.component';
import {LoginComponent} from './full-pages/auth/login/login.component';
import {AuthenticationService} from "./services/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import { UserCreateComponent } from './full-pages/user-authority/user-create/user-create.component';
import { UserEditComponent } from './full-pages/user-authority/user-edit/user-edit.component';
import { ProductCreateComponent } from './full-pages/product/product-create/product-create.component';
import { ProductListComponent } from './full-pages/product/product-list/product-list.component';
import { StockCreateComponent } from './full-pages/stock/stock-create/stock-create.component';
import { StockManagementComponent } from './full-pages/stock/stock-management/stock-management.component';
import { SupplierCreateComponent } from './full-pages/supplier/supplier-create/supplier-create.component';
import { SupplierListComponent } from './full-pages/supplier/supplier-list/supplier-list.component';
import { SupplierPerformanceComponent } from './full-pages/supplier/supplier-performance/supplier-performance.component';
import { PurchasingRequestCreateComponent } from './full-pages/purchasing/purchasing-request-create/purchasing-request-create.component';
import { PurchasingRequestApprovalComponent } from './full-pages/purchasing/purchasing-request-approval/purchasing-request-approval.component';
import { ProductDetailComponent } from './full-pages/product/product-detail/product-detail.component';
import { QualityControlTestResultsComponent } from './full-pages/quality-control/quality-control-test-results/quality-control-test-results.component';
import { UserDetailComponent } from './full-pages/user-authority/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserAuthorityListComponent,
    UserAuthorityCreateComponent,
    HomeComponent,
    LoginComponent,
    UserCreateComponent,
    UserEditComponent,
    ProductCreateComponent,
    ProductListComponent,
    StockCreateComponent,
    StockManagementComponent,
    SupplierCreateComponent,
    SupplierListComponent,
    SupplierPerformanceComponent,
    PurchasingRequestCreateComponent,
    PurchasingRequestApprovalComponent,
    ProductDetailComponent,
    QualityControlTestResultsComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
