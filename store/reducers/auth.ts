import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth';
import { AnyAction } from 'redux';

interface State {
  token: string;
  userId: string;
  didTryAutoLogin: boolean;
}

const initialState: State = {
  token: '',
  userId: '',
  didTryAutoLogin: false,
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
