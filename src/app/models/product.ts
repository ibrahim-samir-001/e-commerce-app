// Describes a single product
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Describes an item in the shopping cart
export interface CartItem {
  product: Product;
  quantity: number;
}

// Describes a logged-in user
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
}

// Describes the response from the login API
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}
