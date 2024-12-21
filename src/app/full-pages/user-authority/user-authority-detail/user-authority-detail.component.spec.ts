import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorityDetailComponent } from './user-authority-detail.component';

describe('UserAuthorityDetailComponent', () => {
  let component: UserAuthorityDetailComponent;
  let fixture: ComponentFixture<UserAuthorityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthorityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
