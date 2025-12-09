// User Types
export interface User {
  id: string;
  username: string;
  email?: string;
  token?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Product Types
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

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

// Navigation Types
export type RootStackParamList = {
  Guest: undefined;
  Auth: undefined;
};

export type GuestStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type AuthStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: number };
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  Settings?: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
