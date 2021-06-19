import AsyncStorage from '@react-native-async-storage/async-storage';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
let timer: ReturnType<typeof setTimeout>;

export const authenticate = (
  userId: string,
  token: string,
  expiryTime: number
) => {
  return (dispatch: Function) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email: string, password: string) => {
  return async (dispatch: Function) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-RwoCUA2-gDNk315-UNFd30bBt3G_H6s',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    let resData;
    if (!response.ok) {
      resData = await response.json();
      let message = 'Something went wrong!';
      if (resData.error.message === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    resData = await response.json();
    dispatch(
      authenticate(
        resData.localId,
        resData.token,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
export const login = (email: string, password: string) => {
  return async (dispatch: Function) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-RwoCUA2-gDNk315-UNFd30bBt3G_H6s',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    let resData;
    if (!response.ok) {
      resData = await response.json();
      const errorMessage = resData.error.message;
      let message = 'Something went wrong!';
      if (errorMessage === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorMessage === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }
    resData = await response.json();
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
    })
  );
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime: number) => {
  return (dispatch: Function) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
