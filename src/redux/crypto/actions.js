

import { notification } from 'antd';

const actions = {
  SET_MOONCOIN_BEGIN: 'SET_MOONCOIN_BEGIN',
  SET_MOONCOIN_SUCCESS: 'SET_MOONCOIN_SUCCESS',
  SET_MOONCOIN_ERR: 'SET_MOONCOIN_ERR',

  SET_REFRESH_BEGIN: 'SET_REFRESH_BEGIN',
  SET_REFRESH_SUCCESS: 'SET_REFRESH_SUCCESS',
  SET_REFRESH_ERR: 'SET_REFRESH_ERR',

  setMooncoinBegin: () => {
    return {
      type: actions.SET_MOONCOIN_BEGIN,
    };
  },

  setMooncoinSuccess: (data) => {
    return {
      type: actions.SET_MOONCOIN_SUCCESS,
      data: data,
    };
  },

  setMooncoinErr: err => {
    notification["error"]({
      message: 'Failed',
      description:
        'Operation failed',
    });
    return {
      type: actions.SET_MOONCOIN_ERR,
      err: true,
    };
  },

  setRefreshBegin: () => {
    return {
      type: actions.SET_REFRESH_BEGIN,
    };
  },

  setRefreshSuccess: data => {
    return {
      type: actions.SET_REFRESH_SUCCESS,
      data,
    };
  },

  setRefreshErr: err => {
    return {
      type: actions.SET_REFRESH_ERR,
      err,
    };
  },
};

export default actions;
