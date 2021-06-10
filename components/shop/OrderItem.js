import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../../constatans/Colors';

import CartItem from './CartItem';
import Card from '../ui/Card';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>{props.amount.toFixed(2)}$</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.orderDetails}>
          {props.items.map((item) => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              amount={item.sum}
              title={item.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  amount: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
  orderDetails: {
    width: '100%',
  },
});

export default OrderItem;
