import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // --- State Properties ---
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  categories: string[] = [];

  // --- Filter and Search Properties ---
  selectedCategory: string = '';
  searchTerm: string = '';

  // --- Pagination Properties ---
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.applyFilters();
    });
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // --- (Other methods like applyFilters, updatePagination are correct) ---
  applyFilters(): void {
    let filtered = [...this.allProducts];
    if (this.selectedCategory) {
      filtered = filtered.filter((p) => p.category === this.selectedCategory);
    }
    if (this.searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredProducts = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePagination();
  }

  
  addToCart(product: Product): void {
    // FIRST, check if the user is logged in.
    if (this.authService.isLoggedIn()) {
      // ONLY if they are logged in, add the product to the cart.
      // This is now called only ONCE.
      this.cartService.addToCart(product);
      this.toastr.success(`${product.title} added to cart!`);
    } else {
      // If not logged in, show a message and redirect.
      // The item is NOT added to the cart.
      this.toastr.info('Please log in to add items to your cart.');
      this.router.navigate(['/login']);
    }
  }
}
