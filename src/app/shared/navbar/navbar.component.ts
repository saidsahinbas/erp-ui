import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isDropdownOpen = false;
  isLoggedIn = false;
  constructor(private router: Router) {}


  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Dropdown'a tıklamayı diğer eventlerden izole et
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    // Ekranın herhangi bir yerine tıklanınca dropdown kapanır
    this.isDropdownOpen = false;
  }

  openUserInfo() {
    this.isDropdownOpen = false;
    alert('Kullanıcı Bilgileri Açıldı');
  }

  logout() {
    this.isDropdownOpen = false;
    alert('Çıkış Yapılıyor');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    this.isLoggedIn = !!userEmail; // userEmail varsa true, yoksa false

  }
}
