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

  permissions: any = {}; // Object to store screen permissions

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      this.permissions = this.mapPermissions(parsedSession.screens);
      console.log(parsedSession)
    }
  }

  /**
   * Converts the screens array into a key-value map for easier access.
   * @param screens Array of permissions from userSession.
   * @returns An object where the keys are screen names and values are permission objects.
   */
  mapPermissions(screens: any[]): any {
    const permissionsMap: any = {};
    screens.forEach(screen => {
      permissionsMap[screen.screenName] = screen;
    });
    return permissionsMap;
  }

  toggleDropdown(dropdownName: string): void {
    Object.keys(this.dropdownStates).forEach(key => {
      this.dropdownStates[key] = key === dropdownName ? !this.dropdownStates[key] : false;
    });
  }

  isDropdownOpen(dropdownName: string): boolean {
    return this.dropdownStates[dropdownName];
  }

  /**
   * Checks if a user has the `read` permission for a specific screen.
   * @param screenName The name of the screen.
   * @returns True if the user has the `read` permission, otherwise false.
   */
  hasReadPermission(screenName: string): boolean {
    return this.permissions[screenName]?.read || false;
  }
}
