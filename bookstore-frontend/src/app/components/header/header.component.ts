import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '@services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // isLoggedIn = false;
  roles = '';
  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
  }

    // this.isLoggedIn = !!this.tokenService.getToken();

    // if (this.isLoggedIn) {
      // const user = this.tokenService.getCurrentUser();
      // this.roles = user.roles;
    // }

  public isLoggedIn(): boolean {
    return this.tokenService.isloggedIn();
  }
  public doLogout(): void {
    this.tokenService.logout();
  }

  public getUsername(): string {
    const user = this.tokenService.getCurrentUser();
    return user ? user.username : 'Guest';
  }
}
