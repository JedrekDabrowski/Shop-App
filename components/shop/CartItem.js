import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View tyle={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.amount.toFixed(2)}</Text>
        {props.delete && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color='red'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 14,
    marginLeft: 4,
    textAlign: 'left',
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    marginVertical: 2,
  },
  deleteButton: {
    marginTop: 5,
    marginLeft: 10,
  },
});

export default CartItem;
