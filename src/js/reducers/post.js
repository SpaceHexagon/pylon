// Post Reducer
import {ADD_POST, GET_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST} from '../constants/ActionTypes';

module.exports = function posts (state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          title: action.title,
          body: action.body,
          tags: action.tags,
          attachments: attachments
        }
      ]
    case DELETE_POST:

    case GET_POST:

    case GET_ALL_POSTS:

    case UPDATE_POST:
    return state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          title: action.title,
          body: action.body,
          tags: action.tags,
          attachments: attachments
        })
      }
      return todo
    })
    default:
      return state;
  }
};
