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
import {AuthenticationServiceService} from "./services/authentication-service.service";
import {HttpClientModule} from "@angular/common/http";
import { UserCreateComponent } from './full-pages/user-authority/user-create/user-create.component';
import { UserEditComponent } from './full-pages/user-authority/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserAuthorityListComponent,
    UserAuthorityCreateComponent,
    HomeComponent,
    LoginComponent,
    UserCreateComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
