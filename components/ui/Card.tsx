import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card: React.FC<{ style: {}; cardKey?: number }> = (props) => {
  return (
    <View key={props.cardKey} style={{ ...props.style, ...styles.card }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 9,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Card;
