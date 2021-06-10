import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constatans/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/ui/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const tranformedCartItems = [];
    for (const key in state.cart.items) {
      tranformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return tranformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            {Math.round(cartTotalAmount.toFixed(2) * 100) / 100}$
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            price={itemData.item.productPrice}
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

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;
