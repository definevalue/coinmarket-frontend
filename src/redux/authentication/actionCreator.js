
import actions from './actions';
import Cookies from 'js-cookie';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (data) => {
  return async dispatch => {
    try {
      dispatch(loginBegin());
      dispatch(loginSuccess( data.isSigned, data.signedUser ));
    } catch ( err ) {
      dispatch(loginErr());
    }
  }
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('isSigned');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
