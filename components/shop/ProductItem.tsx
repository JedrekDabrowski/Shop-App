import React, { ComponentType } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  Platform,
} from 'react-native';

import Card from '../ui/Card';

interface ProductItemProps {
  image: string;
  title: string;
  price: number;
  onSelect: () => void;
}
//TouchableComponent Type
const ProductItem: React.FC<ProductItemProps> = (props) => {
  let TouchableComponent: ComponentType<
    TouchableOpacityProps | TouchableNativeFeedbackProps
  >;
  TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <TouchableComponent onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: props.image }} style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price.toFixed(2)} $</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableComponent>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  info: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
});

export default ProductItem;
