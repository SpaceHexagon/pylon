// File Reducer
import {ADD_FILE, GET_FILE, GET_ALL_FILES, UPDATE_FILE, DELETE_FILE} from '../constants/ActionTypes';

module.exports = function files (state = [], action) {
  switch (action.type) {
    case ADD_FILE:
      return [
        ...state,
        {
          name: action.url,
          type: action.type,
          file_id: action.file_id,
          tags: action.tags
        }
      ]
    case DELETE_FILE:

    case GET_FILE:

    case GET_ALL_FILES:

    case UPDATE_FILE:
    return state.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          tags: action.tags
        })
      }
      return todo
    })
    default:
      return state;
  }
};
