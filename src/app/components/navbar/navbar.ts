import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { User } from '../../models/product';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  currentUser: User | null = null;
  cartItemCount: number = 0;

  // We inject our services to get user and cart data
  constructor(private authService: AuthService, private cartService: CartService) {}

  // ngOnInit is a lifecycle hook that runs when the component is first created
  ngOnInit(): void {
    // This subscription is the key to an updating navbar.
    // It listens for login/logout events from the AuthService.
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Subscribe to changes in the cart items
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
