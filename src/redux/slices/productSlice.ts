import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../../types';
import { productApi } from '../../services/api/productApi';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productApi.getAllProducts();
      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  },
);

// Async thunk to fetch single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: number, { rejectWithValue }) => {
    try {
      const product = await productApi.getProductById(productId);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  },
);

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const products = await productApi.getProductsByCategory(category);
      return products;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch products by category',
      );
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: state => {
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    clearProducts: state => {
      state.products = [];
    },
  },
  extraReducers: builder => {
    // Fetch all products
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Failed to fetch products';
    });

    // Fetch product by ID
    builder.addCase(fetchProductById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || 'Failed to fetch product';
    });

    // Fetch products by category
    builder.addCase(fetchProductsByCategory.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || 'Failed to fetch products by category';
    });
  },
});

export const { clearError, setSelectedProduct, clearProducts } =
  productSlice.actions;
export default productSlice.reducer;
