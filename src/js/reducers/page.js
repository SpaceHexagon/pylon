// Page Reducer
import {ADD_PAGE, GET_PAGE, GET_ALL_PAGES, UPDATE_PAGE, DELETE_PAGE} from '../constants/ActionTypes';


module.exports = function pages (state = [], action) {
  switch (action.type) {
    case ADD_PAGE:
      return [
        ...state,
        {
          title: action.title,
          url: action.url,
          body: action.body,
          nav: action.nav
        }
      ]
    case DELETE_PAGE:

    case GET_PAGE:

    case GET_ALL_PAGES:

    case UPDATE_PAGE:
    return state.map((page, index) => {
      if (index === action.index) {
        return Object.assign({}, page, {
          nick: action.nick
        })
      }
      return page
    })
    default:
      return state;
  }
};
