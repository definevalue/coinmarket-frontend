
import actions from './actions';

const { setMooncoinBegin, setMooncoinSuccess, setMooncoinErr, setRefreshBegin, setRefreshSuccess, setRefreshErr } = actions;

const setMooncoin = (data) => {
  return async dispatch => {
    try {
      dispatch(setMooncoinBegin());
      dispatch(setMooncoinSuccess( data ));
    //   console.log(data)
    } catch ( err ) {
      dispatch(setMooncoinErr(err));
    }
  }
};

const setRefresh = (data) => {
    return async dispatch => {
        try {
            dispatch(setRefreshBegin());
            dispatch(setRefreshSuccess( data.isSigned, data.signedUser ));
        } catch ( err ) {
            dispatch(setRefreshErr(err));
        }
    }
};

export { setMooncoin, setRefresh };
