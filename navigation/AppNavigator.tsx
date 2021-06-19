import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';
import { RootState } from '../store/store';

const AppNavigator = () => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  const didTryAutoLogin = useSelector(
    (state: RootState) => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
