import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private authService: AuthenticationService) {}

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/login']);
    }
  }
}
