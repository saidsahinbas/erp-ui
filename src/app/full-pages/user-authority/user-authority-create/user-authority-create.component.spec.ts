import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorityCreateComponent } from './user-authority-create.component';

describe('UserAuthorityCreateComponent', () => {
  let component: UserAuthorityCreateComponent;
  let fixture: ComponentFixture<UserAuthorityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthorityCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthorityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
