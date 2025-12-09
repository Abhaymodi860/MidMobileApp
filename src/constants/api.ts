export const API_CONFIG = {
  BASE_URL: 'https://fakestoreapi.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id: number) => `/products/${id}`,
    CATEGORIES: '/products/categories',
    PRODUCTS_BY_CATEGORY: (category: string) =>
      `/products/category/${category}`,
  },
  TIMEOUT: 10000,
};

export const API_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};
