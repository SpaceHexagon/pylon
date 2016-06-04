// Group Reducer
import {ADD_GROUP, GET_GROUP, GET_ALL_GROUPS, UPDATE_GROUP, DELETE_GROUP} from '../constants/ActionTypes';

module.exports = function groups (state = [], action) {
  switch (action.type) {
    case ADD_GROUP:
      return [
        ...state,
        {
          name: action.url,
          nick: action.nick,
          email: action.email,
          pic: action.pic,
          members: action.members
        }
      ]
    case DELETE_GROUP:

    case GET_GROUP:

    case GET_ALL_GROUPS:

    case UPDATE_GROUP:
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
