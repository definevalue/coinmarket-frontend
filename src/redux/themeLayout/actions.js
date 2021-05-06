const actions = {
  CHANGE_LAYOUT_MODE_BEGIN: 'CHANGE_LAYOUT_MODE_BEGIN',
  CHANGE_LAYOUT_MODE_SUCCESS: 'CHANGE_LAYOUT_MODE_SUCCESS',
  CHANGE_LAYOUT_MODE_ERR: 'CHANGE_LAYOUT_MODE_ERR',

  CHANGE_RTL_MODE_BEGIN: 'CHANGE_RTL_MODE_BEGIN',
  CHANGE_RTL_MODE_SUCCESS: 'CHANGE_RTL_MODE_SUCCESS',
  CHANGE_RTL_MODE_ERR: 'CHANGE_RTL_MODE_ERR',

  CHANGE_MENU_MODE_BEGIN: 'CHANGE_MENU_MODE_BEGIN',
  CHANGE_MENU_MODE_SUCCESS: 'CHANGE_MENU_MODE_SUCCESS',
  CHANGE_MENU_MODE_ERR: 'CHANGE_MENU_MODE_ERR',

  SET_BLUR_BEGIN: 'SET_BLUR_BEGIN',
  SET_BLUR_SUCCESS: 'SET_BLUR_SUCCESS',
  SET_BLUR_ERR: 'SET_BLUR_ERR',

  changeLayoutBegin: () => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_BEGIN,
    };
  },

  changeLayoutSuccess: data => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_SUCCESS,
      data,
    };
  },

  changeLayoutErr: err => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_ERR,
      err,
    };
  },

  changeRtlBegin: () => {
    return {
      type: actions.CHANGE_RTL_MODE_BEGIN,
    };
  },

  changeRtlSuccess: data => {
    return {
      type: actions.CHANGE_RTL_MODE_SUCCESS,
      data,
    };
  },

  changeRtlErr: err => {
    return {
      type: actions.CHANGE_RTL_MODE_ERR,
      err,
    };
  },

  changeMenuBegin: () => {
    return {
      type: actions.CHANGE_MENU_MODE_BEGIN,
    };
  },

  changeMenuSuccess: data => {
    return {
      type: actions.CHANGE_MENU_MODE_SUCCESS,
      data,
    };
  },

  changeMenuErr: err => {
    return {
      type: actions.CHANGE_MENU_MODE_ERR,
      err,
    };
  },

  setBlurBegin: () => {
    
    return {
      type: actions.SET_BLUR_BEGIN,
    };
  },

  setBlurSuccess: data => {
    return {
      type: actions.SET_BLUR_SUCCESS,
      data,
    };
  },

  setBlurErr: err => {
    return {
      type: actions.SET_BLUR_ERR,
      err,
    };
  },
};

export default actions;
