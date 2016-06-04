// Folder Reducer
import {ADD_FOLDER, GET_FOLDER, GET_ALL_FOLDERS, UPDATE_FOLDER, DELETE_FOLDER} from '../constants/ActionTypes';

module.exports = function folders (state = [], action) {
  switch (action.type) {
    case ADD_FOLDER:
      return [
        ...state,
        {
          name: action.url,
          parent: action.parent,
          share_id: action.share_id
        }
      ]
    case DELETE_FOLDER:

    case GET_FOLDER:

    case GET_ALL_FOLDERS:

    case UPDATE_FOLDER:
    return state.map((folder, index) => {
      if (index === action.index) {
        return Object.assign({}, folder, {
          name: action.url,
          parent: action.parent,
          share_id: action.share_id
        })
      }
      return folder
    })
    default:
      return state;
  }
};
