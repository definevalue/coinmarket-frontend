import actions from './actions';

const {
  changeLayoutBegin,
  changeLayoutSuccess,
  changeLayoutErr,
  changeRtlBegin,
  changeRtlSuccess,
  changeRtlErr,
  changeMenuBegin,
  changeMenuSuccess,
  changeMenuErr,
  setBlurBegin,
  setBlurSuccess,
  setBlurErr
} = actions;

const changeLayoutMode = value => {
  return async dispatch => {
    try {
      dispatch(changeLayoutBegin());
      dispatch(changeLayoutSuccess(value));
    } catch (err) {
      dispatch(changeLayoutErr(err));
    }
  };
};

const changeRtlMode = value => {
  return async dispatch => {
    try {
      dispatch(changeRtlBegin());
      dispatch(changeRtlSuccess(value));
    } catch (err) {
      dispatch(changeRtlErr(err));
    }
  };
};

const changeMenuMode = value => {
  return async dispatch => {
    try {
      dispatch(changeMenuBegin());
      dispatch(changeMenuSuccess(value));
    } catch (err) {
      dispatch(changeMenuErr(err));
    }
  };
};

const setBlur = value => {
  return async dispatch => {
    try {
      dispatch(setBlurBegin());
      dispatch(setBlurSuccess(value));
    } catch (err) {
      dispatch(setBlurErr(err));
    }
  };
};

export { changeLayoutMode, changeRtlMode, changeMenuMode, setBlur };