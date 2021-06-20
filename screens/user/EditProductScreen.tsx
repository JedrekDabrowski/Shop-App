import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { NavigationParams } from 'react-navigation';

import HeaderButton from '../../components/ui/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/ui/Input';
import Colors from '../../constatans/Colors';
import { RootState } from '../../store/store';
import Product from '../../models/classes/product';

interface FormState {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidated: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
}

interface FormAction {
  type: string;
  input: string;
  value: string;
  isValid: boolean;
}

const formReducer = (state: FormState, action: FormAction) => {
  if (action.type === 'UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidated = {
      ...state.inputValidated,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    // for (const key in updatedInputValidated) {
    //   updatedFormIsValid = updatedFormIsValid && updatedInputValidated[key];
    // }
    return {
      formIsValid: updatedFormIsValid,
      inputValidated: updatedInputValidated,
      inputValues: updatedValues,
    };
  }
  return state;
};
type EditParamsList = {
  Edit: { productId: string };
};

type Props = {
  route: RouteProp<EditParamsList, 'Edit'>;
  navigation: StackNavigationProp<EditParamsList, 'Edit'>;
};

const EditProductScreen = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | string>(false);

  const prodId = route.params ? route.params.productId : null;
  let editedProduct: Product | null;
  if (prodId) {
    editedProduct = useSelector((state: RootState) =>
      state.products.userProducts.find((prod: Product) => prod.id === prodId)
    );
  } else {
    editedProduct = null;
  }

  const dispatch = useDispatch();

  // const productId = route.params.productId;
  //   const selectedProduct = useSelector((state: RootState) =>
  //   state.products.availableProducts.find(
  //     (prod: Product) => prod.id === productId
  //   )
  // );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidated: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (typeof error === 'string') {
      Alert.alert('An error occured!', error, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    setError(false);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Save'
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputIsValid) => {
      dispatchFormState({
        type: 'UPDATE',
        value: inputValue,
        isValid: inputIsValid,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorMsg='Please enter a valid title.'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorMsg='Please enter a valid image Url.'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorMsg='Please enter a valid price.'
              returnKeyType='next'
              keyboardType='decimal-pad'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorMsg='Please enter a valid description.'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const editProdcutsScreenOptions = ({ route }: any) => {
  const routeParams = route.params ? route.params : {};
  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
