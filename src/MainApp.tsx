import React from 'react';

import { IndicatorView } from '@app/blueprints';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AuthProvider, LocalizationProvider, ThemeProvider } from './context';
import { AppNavigation, navigationRef } from './navigation/AppNavigation';
import store, { persistor } from './store';
import { loader } from './utils';

export const MainApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider>
          <NavigationContainer ref={navigationRef}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthProvider>
                <AppNavigation />
              </AuthProvider>
              <IndicatorView isLoading={false} ref={loader} />
            </PersistGate>
          </NavigationContainer>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};
