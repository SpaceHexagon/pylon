// Share Reducer

import {ADD_SHARE, GET_SHARE, GET_ALL_SHARES, UPDATE_SHARE, DELETE_SHARE} from '../constants/ActionTypes';

module.exports = function shares (state = [], action) {
  switch (action.type) {
    case ADD_SHARE:
      return [
        ...state,
        {
          type: action.type,
          title: action.title,
          id: action.id
        }
      ]
    case DELETE_SHARE:

    case GET_SHARE:

    case GET_ALL_SHARES:

    case UPDATE_SHARE:
    return state.map((share, index) => {
      if (index === action.index) {
        return Object.assign({}, share, {
          type: action.type,
          title: action.title,
          id: action.id
        })
      }
      return share
    })
    default:
      return state;
  }
};
