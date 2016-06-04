// Applet Reducer
import {OPEN_APPLET, SAVE_APPLET_DATA, GET_ALL_APPLETS, CLOSE_APPLET} from '../constants/ActionTypes';

module.exports = function applets (state = [], action) {
  switch (action.type) {
    case OPEN_APPLET:
      return [
        ...state,
        {
          title: action.title,
          minimized: false,
          openFiles: []
        }
      ]
    case CLOSE_APPLET:
    return state.map((applet, index) => {
      if (index === action.index) {
        return Object.assign({}, applet, {
          minimized: true
        })
      }
      return applet;
    })
    case GET_ALL_APPLETS:

    case SAVE_APPLET_DATA:

    default:
      return state;
  }
};
