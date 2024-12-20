import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dropdownStates: any = {
    user: false,
    product: false,
    stock: false,
    supplier: false,
    purchase: false,
    quality: false
  };

  constructor(private router: Router,
              private authService: AuthenticationService) {

  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown(dropdownName: string): void {
    Object.keys(this.dropdownStates).forEach(key => {
      this.dropdownStates[key] = key === dropdownName ? !this.dropdownStates[key] : false;
    });
  }

  isDropdownOpen(dropdownName: string): boolean {
    return this.dropdownStates[dropdownName];
  }


}
