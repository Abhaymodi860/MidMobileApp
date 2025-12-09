import { store } from './store';
import { loginUser } from './slices/authSlice';

// Test function - you can delete this file after verification
export const testRedux = () => {
  console.log('Initial State:', store.getState());

  // Test login
  store.dispatch(loginUser({ username: 'testuser', password: 'password123' }));

  setTimeout(() => {
    console.log('After Login:', store.getState());
  }, 1000);
};
