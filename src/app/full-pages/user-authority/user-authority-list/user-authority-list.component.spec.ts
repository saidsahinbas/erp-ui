import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorityListComponent } from './user-authority-list.component';

describe('UserAuthorityListComponent', () => {
  let component: UserAuthorityListComponent;
  let fixture: ComponentFixture<UserAuthorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthorityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
