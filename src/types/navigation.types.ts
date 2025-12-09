import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';

// Stack Param Lists
export type RootStackParamList = {
  Guest: undefined;
  Auth: undefined;
};

export type GuestStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type AuthStackParamList = {
  MainDrawer: undefined;
  ProductDetails: { productId: number };
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
};

// Screen Props Types
export type WelcomeScreenProps = StackScreenProps<
  GuestStackParamList,
  'Welcome'
>;
export type LoginScreenProps = StackScreenProps<GuestStackParamList, 'Login'>;
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  StackScreenProps<AuthStackParamList>
>;
export type DashboardScreenProps = BottomTabScreenProps<
  TabParamList,
  'Dashboard'
>;
export type ProductDetailsScreenProps = StackScreenProps<
  AuthStackParamList,
  'ProductDetails'
>;
