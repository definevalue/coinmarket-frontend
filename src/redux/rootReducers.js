import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import cryptoReducer from './crypto/reducers';
import ChangeLayoutMode from './themeLayout/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  crypto: cryptoReducer,
  ChangeLayoutMode,
});

export default rootReducers;
