// PAGE Actions
import * as types from '../constants/ActionTypes';

export function addPage (title, body) {
  return {
    type: types.ADD_PAGE,
    title: title,
		body: body
  };
}

export function getPage (id) {
  return {
    type: types.GET_PAGE,
		id
  };
}

export function getAllPages (id) {
  return {
    type: types.GET_ALL_PAGES,
		id
  };
}

export function updatePage (id) {
  return {
    type: types.UPDATE_PAGE,
		id
  };
}

export function deletePage (id) {
  return {
    type: types.DELETE_PAGE,
    id
  };
}
