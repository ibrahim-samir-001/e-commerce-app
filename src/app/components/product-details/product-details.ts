import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get the 'id' from the URL (e.g., /product/5)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id); // '+' converts the string id to a number
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        // If the product isn't found, go back to the products list
        this.loading = false;
        this.router.navigate(['/products']);
      },
    });
  }

  addToCart(): void {
    if (this.authService.isLoggedIn()) {
      if (this.product) {
        this.cartService.addToCart(this.product, this.quantity);
        this.toastr.success(`${this.product.title} added to cart!`);
      }
    } else {
      // Redirect to login if not authenticated
      this.toastr.info('Please log in to add items to your cart.');
      this.router.navigate(['/login']);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
