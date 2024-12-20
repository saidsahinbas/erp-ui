import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  userFullName: string;
  isDropdownOpen = false;
  isLoggedIn = false;
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {

  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Dropdown'a tıklamayı diğer eventlerden izole et
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    this.isDropdownOpen = false;
  }

  openUserInfo() {
    this.isDropdownOpen = false;
    this.router.navigate(['/user-detail']);
  }

  logout() {
    this.isDropdownOpen = false;
    this.authenticationService.logout();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.isLoggedIn = !!userEmail; // userEmail varsa true, yoksa false

    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      this.user = JSON.parse(userSession);
    }

    this.userFullName = this.user.firstName + ' ' + this.user.lastName;
  }
}
