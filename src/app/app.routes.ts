import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { NotFound } from './components/not-found/not-found';
import { ContactUs } from './components/contact-us/contact-us';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  // Default route redirects to the products page
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: ContactUs },

  // Page routes
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },

  // Protected routes
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },

  // Wildcard route for 404 Not Found pages
  { path: '**', component: NotFound },
];
