import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constatans/Colors';
import CartItemComponent from '../../components/shop/CartItem';
import CartItem from '../../models/classes/cart-item';
import Card from '../../components/ui/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import { RootState } from '../../store/store';
const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  );

  const cartItems = useSelector((state: RootState) => {
    const tranformedCartItems = [];
    for (const key in state.cart.items) {
      const cartItem = new CartItem(
        key,
        state.cart.items[key].productTitle,
        state.cart.items[key].productPrice,
        state.cart.items[key].quantity,
        state.cart.items[key].sum,
        state.cart.items[key].pushToken
      );
      tranformedCartItems.push(cartItem);
    }

    return tranformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();
  const sendOrderHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}$
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItemComponent
            key={itemData.item.productId}
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            delete
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export const cartOptionsScreen = {
  headerTitle: 'Your Cart',
};

export default CartScreen;
