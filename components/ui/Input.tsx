import React, { useReducer, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

// interface Action {
//   type: string;
//   isValid?: boolean;
//   value?: string;
// }
// interface State {
//   touched: boolean;
//   isValid: boolean;
//   value: string;
// }

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

interface InputProps {
  id: string;
  initialValue?: string;
  initiallyValid?: boolean;
  label: string;
  errorMsg: string;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words' | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  returnKeyType?: ReturnKeyTypeOptions | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [onInputChange, inputState, id]);

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{props.errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 3,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  error: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: 'red',
  },
});

export default Input;
