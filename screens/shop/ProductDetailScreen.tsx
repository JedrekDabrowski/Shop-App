import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RouteProp } from '@react-navigation/native';

import Colors from '../../constatans/Colors';
import Product from '../../models/classes/product';
import * as cartActions from '../../store/actions/cart';
import { RootState } from '../../store/store';

type ProductParamsList = {
  ProductDetail: { productId: string; productTitle: string };
};

type Props = {
  route: RouteProp<ProductParamsList, 'ProductDetail'>;
};

const ProductDetailScreen = ({ route }: Props) => {
  const productId = route.params.productId;
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (prod: Product) => prod.id === productId
    )
  );

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add To Cart'
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}$</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const detailScreenOptions = ({ route }: Props) => {
  return {
    headerTitle: route.params.productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
