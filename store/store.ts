import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';
// createStore,, getDefaultMiddleware, applyMiddleware
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});
//, composeWithDevTools()
export const store = configureStore({
  reducer: rootReducer,
  middleware: [ReduxThunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
