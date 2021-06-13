import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import Colors from '../constatans/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const tranformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = tranformedData;
      const expDate = new Date(expirationDate);

      if (expDate <= new Date() || !token || !userId) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const expiratonTime = expDate.getTime() - new Date().getTime();

      dispatch(authActions.authenticate(userId, token, expiratonTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
