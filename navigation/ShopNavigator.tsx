import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Platform, Button, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, {
  overviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  detailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import CartScreen, { cartOptionsScreen } from '../screens/shop/CartScreen';
import OrdersScreen, { orderScreenOptions } from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
  userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  editProdcutsScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, { authScreenOptions } from '../screens/user/AuthScreen';
import Colors from '../constatans/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={overviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={detailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartOptionsScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};
const OrderStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrderStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={orderScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <UserStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProdcutsScreenOptions}
      />
    </UserStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  color={Colors.primary}
                  title='Logout'
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}
                />
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          paddingTop: 30,
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
              style={{ paddingTop: 30 }}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
              style={{ paddingTop: 30 }}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='User'
        component={UserNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
              style={{ paddingTop: 30 }}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
