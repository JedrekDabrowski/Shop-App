import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constatans/Colors';
import * as ordersActions from '../../store/actions/orders';
import { RootState } from '../../store/store';

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      dispatch(ordersActions.fetchOrders());
    };
    fetchOrders();
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.info}>
          No orders found. maybe start ordering some products?
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          orderKey={+itemData.item.id}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
          delete={false}
        />
      )}
    />
  );
};

export const orderScreenOptions = ({ navigation }: any) => {
  return {
    headertTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontFamily: 'open-sans',
  },
});

export default OrdersScreen;
