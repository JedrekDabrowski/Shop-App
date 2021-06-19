import React from 'react';
import {
  FlatList,
  Platform,
  Button,
  Alert,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationParams } from 'react-navigation';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constatans/Colors';
import * as productsActions from '../../store/actions/products';
import { RootState } from '../../store/store';

const UserProductsScreen: React.FC<NavigationParams> = (props) => {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  );
  const dispatch = useDispatch();

  const editProductHandler = (id: string) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.info}>
          No products found. maybe start creating some?
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export const userProductsScreenOptions = ({ navigation }: any) => {
  return {
    headerTitle: 'Your Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Create'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigation.navigate('EditProduct');
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

export default UserProductsScreen;
