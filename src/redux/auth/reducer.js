import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({ 
  idToken: null,
  loginFailure: false,
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null, // <-- Just an example. Attributes are whatever you specify in your cofig (below).
      },
    },
  }
});

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('reduxTokenAuth.currentUser.isSignedIn', true);
    case actions.LOGOUT:
      return initState;
    case actions.LOGIN_ERROR:
      return state.set('loginFailure', true );
    default:
      return state;
  }
}
