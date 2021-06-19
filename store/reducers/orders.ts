import Order from '../../models/classes/order';
import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import { AnyAction } from 'redux';

interface State {
  orders: Order[];
}

const initialState: State = {
  orders: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
