import actions from './actions';

const { SET_MOONCOIN_BEGIN, SET_MOONCOIN_SUCCESS, SET_MOONCOIN_ERR, SET_REFRESH_BEGIN, SET_REFRESH_SUCCESS, SET_REFRESH_ERR } = actions;

const initState = {
  isMooncoin: false,
  isRefresh: false,
  loading: false
};

/**
 *
 * @todo impure state mutation/explaination
 */
 const CryptoReducer = (state = initState, action) => {
    const { type, data, err } = action;
  switch (type) {
    case SET_MOONCOIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SET_MOONCOIN_SUCCESS:
      return {
        ...state,
        isMooncoin: data,
        loading: false,
      };
    case SET_MOONCOIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case SET_REFRESH_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SET_REFRESH_SUCCESS:
      return {
        ...state,
        isSigned: data,
        loading: false,
      };
    case SET_REFRESH_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
}

export default CryptoReducer;