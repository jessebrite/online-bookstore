import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '@services/token-storage.service';
import { CartService } from '@services/cart.service';
import { Role } from '@common/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles = '';

  constructor(
    private tokenService: TokenStorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  public doLogout(): void {
    this.cartService.cartItems.splice(0);
    this.tokenService.logout();
  }

  get isAdmin(): boolean {
    const user = this.tokenService.getCurrentUser();
    return user?.roles?.includes(Role.ADMIN);
  }

  public getUsername(): string {
    const user = this.tokenService.getCurrentUser();
    return user ? user.username : 'Guest';
  }
}
