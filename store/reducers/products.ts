import { AnyAction } from 'redux';

import Product from '../../models/classes/product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';

interface State {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: State = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case DELETE_PRODUCT:
      return {
        // ...state,
        userProducts: state.userProducts.filter(
          (prod: Product) => prod.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (prod: Product) => prod.id !== action.productId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = { ...state.userProducts };
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = { ...state.availableProducts };
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
  }
  return state;
};
