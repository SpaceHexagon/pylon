// Cell Reducer
import {ADD_CELL, GET_CELL, GET_ALL_CELLS, UPDATE_CELL, DELETE_CELL} from '../constants/ActionTypes';

module.exports = function cells (state = [], action) {
  switch (action.type) {
    case ADD_CELL:
      return [
        ...state,
        {
          name: action.url,
          nick: action.type,
          email: action.email,
          pic: action.pic
        }
      ]
    case DELETE_CELL:

    case GET_CELL:

    case GET_ALL_CELLS:

    case UPDATE_CELL:
    return state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          nick: action.nick
        })
      }
      return todo
    })
    default:
      return state;
  }
};
