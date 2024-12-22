import { Component, OnInit } from '@angular/core';
import {AuthorityService} from "../../../services/authority.service";
import {AuthorityCreateRequest} from "../../../models/authority/authority-create-request";
import {ScreenService} from "../../../services/screen.service";

@Component({
  selector: 'app-user-authority-create',
  templateUrl: './user-authority-create.component.html',
  styleUrls: ['./user-authority-create.component.css']
})
export class UserAuthorityCreateComponent implements OnInit {
  authorityCreate: AuthorityCreateRequest = {
    groupName: '',
    rolePermissionItems: []
  };

  screens: { id: number; name: string }[] = []; // Holds the list of screens

  constructor(
    private authorityService: AuthorityService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.loadAllScreens();
  }

  loadAllScreens(): void {
    this.screenService.getAllScreen().subscribe(
      (res) => {
        // Map the response to only include id and name
        this.screens = res.map((screen: any) => ({
          id: screen.id,
          name: screen.name,
        }));

        // Initialize rolePermissionItems with default values
        this.authorityCreate.rolePermissionItems = this.screens.map((screen) => ({
          screenId: screen.id,
          create: false,
          delete: false,
          read: false,
          update: false,
        }));
      },
      (error) => {
        console.error('Error loading screens:', error);
      }
    );
  }

  handleSave(): void {
    // Send the data to backend
    this.authorityService.createAuthorityGroup(this.authorityCreate).subscribe(
      (res) => {
        console.log('Authority group created successfully:', res);
        alert('Authority group created successfully!');
      },
      (error) => {
        console.error('Error creating authority group:', error);
        alert('Failed to create authority group.');
      }
    );
  }
}
