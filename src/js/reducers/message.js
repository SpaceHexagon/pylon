// Message Reducer
import {ADD_MESSAGE, GET_MESSAGE, GET_ALL_MESSAGES, UPDATE_MESSAGE, DELETE_MESSAGE} from '../constants/ActionTypes';

module.exports = function messages (state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          to: action.to,
          from: action.from,
          title: action.title,
          body: action.body,
          attachments: action.attachments
        }
      ]
    case DELETE_MESSAGE:

    case GET_MESSAGE:

    case GET_ALL_MESSAGES:

    case UPDATE_MESSAGE:
    return state.map((message, index) => {
      if (index === action.index) {
        return Object.assign({}, message, {
          to: action.to,
          body: action.body,
          title: action.title,
          attachments: action.attachments
        })
      }
      return message
    })
    default:
      return state;
  }
};
