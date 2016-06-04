// Path Reducer
import {ADD_PATH, GET_PATH, GET_ALL_PATHS, UPDATE_PATH, DELETE_PATH} from '../constants/ActionTypes';

module.exports = function paths (state = [], action) {
  switch (action.type) {
    case ADD_PATH:
      return [
        ...state,
        {
          name: action.url,
          data: action.data,
          to: action.to,
          from: action.from
        }
      ]
    case DELETE_PATH:

    case GET_PATH:

    case GET_ALL_PATHS:

    case UPDATE_PATH:
    return state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          name: action.url,
          data: action.data,
          to: action.to,
          from: action.from
        })
      }
      return todo
    })
    default:
      return state;
  }
};
