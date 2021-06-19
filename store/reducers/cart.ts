import { AnyAction } from 'redux';

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/classes/cart-item';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

interface State {
  items: CartItem[];
  totalAmount: number;
}

const initialState: State = {
  items: [],
  totalAmount: 0,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;

      let updatedOrNewItem;
      // class CartItem {
      //   constructor(
      //     public productId: string,
      //     public productTitle: string,
      //     public productPrice: number,
      //     public quantity: number,
      //     public sum: number,
      //     public pushToken: string
      //   ) {}
      // }

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewItem = new CartItem(
          addedProduct.id,
          prodTitle,
          prodPrice,
          state.items[addedProduct.id].quantity + 1,
          state.items[addedProduct.id].sum + prodPrice,
          pushToken
        );
      } else {
        updatedOrNewItem = new CartItem(
          addedProduct.id,
          prodTitle,
          prodPrice,
          1,
          prodPrice,
          pushToken
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedProduct = state.items[action.productId];
      const currentQuantity = selectedProduct.quantity;
      let updatedCartItems;
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedProduct.productId,
          selectedProduct.productTitle,
          selectedProduct.productPrice,
          selectedProduct.quantity - 1,
          selectedProduct.sum - selectedProduct.productPrice,
          selectedProduct.pushToken
        );
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state;
};
