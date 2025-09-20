import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  // A BehaviorSubject holds the current list of cart items and lets components subscribe to changes.
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart from browser's localStorage when the service is created
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.updateCart(currentItems);
  }

  // Updates the quantity of a specific item in the cart
  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      // If quantity is zero or less, remove the item
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart(currentItems);
      }
    }
  }

  // Removes an item completely from the cart
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter((item) => item.product.id !== productId);
    this.updateCart(currentItems);
  }

  // Empties the entire cart
  clearCart(): void {
    this.updateCart([]);
  }

  // Calculates the total price of all items in the cart
  getTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Calculates the total number of items in the cart (for the navbar badge)
  getItemCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  // Helper method to update the BehaviorSubject and save to localStorage
  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
