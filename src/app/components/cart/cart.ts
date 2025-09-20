import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Subscribe to cart updates
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  // Called when the quantity input is changed
  updateQuantity(productId: number, event: any): void {
    const quantity = +event.target.value; // Convert input value to a number
    this.cartService.updateQuantity(productId, quantity);
  }

  // Removes an item from the cart
  removeItem(productId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  // Clears all items from the cart
  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }

  // Placeholder for checkout functionality
  checkout(): void {
    this.toastr.info('Checkout functionality is a future feature.', 'Coming Soon');
  }
}
