import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './full-pages/home/home.component';
import { UserAuthorityCreateComponent } from './full-pages/user-authority/user-authority-create/user-authority-create.component';
import { UserAuthorityListComponent } from './full-pages/user-authority/user-authority-list/user-authority-list.component';
import {LoginComponent} from "./full-pages/auth/login/login.component";
import {UserCreateComponent} from "./full-pages/user-authority/user-create/user-create.component";
import {UserEditComponent} from "./full-pages/user-authority/user-edit/user-edit.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },  // Home sayfası
  { path: 'add-user', component: UserCreateComponent },
  { path: 'manage-user', component: UserEditComponent },
  { path: 'user-authority-create', component: UserAuthorityCreateComponent }, // Yetki Oluşturma
  { path: 'user-authority-list', component: UserAuthorityListComponent },    // Yetki Listeleme
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Varsayılan rota
  { path: '**', redirectTo: 'login' } // Hatalı rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
