import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any = null;
  constructor() { }

  ngOnInit(): void {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      this.user = JSON.parse(userSession);
    }
  }

}
