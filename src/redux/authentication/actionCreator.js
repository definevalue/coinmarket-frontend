import Cookies from 'js-cookie';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const options = data => {
  return {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
  };
};

const login = (data) => {
  return async dispatch => {
    fetch('/api/users/login', options(data))
    .then(res => res.json())
    .then(res => {
        if (res.success) {
          dispatch(loginBegin());
          setTimeout(() => {
            Cookies.set('logedIn', true);
            return dispatch(loginSuccess(true));
          }, 1000);
        } else {
          setTimeout(() => {
            Cookies.set('logedIn', false);
            return dispatch(loginErr(res));
          }, 1000);
        }
    })
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
