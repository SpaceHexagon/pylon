// Document Reducer
import {ADD_PATH, GET_DOCUMENT, GET_ALL_DOCUMENTS, UPDATE_DOCUMENT, DELETE_DOCUMENT} from '../constants/ActionTypes';

module.exports = function documents (state = [], action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return [
        ...state,
        {
          title: action.title,
          body: action.body,
          attachments: action.attachments
        }
      ]
    case DELETE_DOCUMENT:

    case GET_DOCUMENT:

    case GET_ALL_DOCUMENTS:

    case UPDATE_DOCUMENT:
    return state.map((doc, index) => {
      if (index === action.index) {
        return Object.assign({}, doc, {
          body: action.body
        })
      }
      return doc
    })
    default:
      return state;
  }
};
