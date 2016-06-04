// Building Reducer
import {ADD_BUILDING, GET_BUILDING, GET_ALL_BUILDINGS, UPDATE_BUILDING, DELETE_BUILDING} from '../constants/ActionTypes';

module.exports = function buildings (state = [], action) {
  switch (action.type) {
    case ADD_BUILDING:
      return [
        ...state,
        {
          name: action.url,
          data: action.data,
          pic: action.pic
        }
      ]
    case DELETE_BUILDING:

    case GET_BUILDING:

    case GET_ALL_BUILDINGS:

    case UPDATE_BUILDING:
    return state.map((building, index) => {
      if (index === action.index) {
        return Object.assign({}, building, {
          name: action.url,
          data: action.data,
          pic: action.pic
        })
      }
      return building;
    })
    default:
      return state;
  }
};
