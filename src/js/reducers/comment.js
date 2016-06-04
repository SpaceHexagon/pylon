// Comment Reducer
import {ADD_COMMENT, GET_COMMENT, GET_ALL_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT} from '../constants/ActionTypes';

module.exports = function comments (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state,
        {
          user_id: action.user_id,
          username: action.username,
          message: action.message,
          attachments: action.attachments
        }
      ]
    case DELETE_COMMENT:

    case GET_COMMENT:

    case GET_ALL_COMMENTS:

    case UPDATE_COMMENT:
    return state.map((comment, index) => {
      if (index === action.index) {
        return Object.assign({}, comment, {
          message: action.message
        })
      }
      return comment;
    })
    default:
      return state;
  }
};
