import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../services/authority.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-authority-list',
  templateUrl: './user-authority-list.component.html',
  styleUrls: ['./user-authority-list.component.css']
})
export class UserAuthorityListComponent implements OnInit {
  authorities: { id: number; name: string }[] = []; // Authority list

  constructor(
    private authorityService: AuthorityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllAuthorities();
  }

  loadAllAuthorities(): void {
    this.authorityService.getAllAuthorities().subscribe(
      (res) => {
        this.authorities = res;
      },
      (error) => {
        console.error('Error fetching authority groups:', error);
      }
    );
  }

  navigateToDetails(authorityId: number): void {
    this.router.navigate(['/user-authority-detail', authorityId]);
  }


  handleAddRemoveUsers(authorityId: number): void {
    alert(`Add/Remove Users for Authority ID: ${authorityId}`);
  }

  handleEditPermissions(authorityId: number): void {
    alert(`Edit Permissions for Authority ID: ${authorityId}`);
  }
}
