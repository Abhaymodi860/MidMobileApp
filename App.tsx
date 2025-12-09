import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, StyleSheet } from 'react-native';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* Navigation will be added in next steps */}
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
