// PAGE Actions
import {ADD_PAGE, GET_PAGE, GET_ALL_PAGES, UPDATE_PAGE, DELETE_PAGE} from '../constants/ActionTypes';

export function addPage (title, body) {
  return {
    type: ADD_PAGE,
    title: title,
		body: body
  };
}

export function getPage (id) {
  return {
    type: GET_PAGE,
		id
  };
}

export function getAllPages (id) {
  return {
    type: GET_ALL_PAGES,
		id
  };
}

export function updatePage (id) {
  return {
    type: UPDATE_PAGE,
		id
  };
}

export function deletePage (id) {
  return {
    type: DELETE_PAGE,
    id
  };
}
