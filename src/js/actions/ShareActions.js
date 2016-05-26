// File Actions
import * as types from '../constants/ActionTypes';

export function addShare (title) {
  return {
    type: types.ADD_SHARE,
    title: title
  };
}

export function getShare (id) {
  return {
    type: types.GET_SHARE,
		id
  };
}

export function getAllShares (id) {
  return {
    type: types.GET_ALL_SHARES,
		id
  };
}

export function updateShare (id, title) {
  return {
    type: types.UPDATE_SHARE,
		title: title,
		id: id
  };
}

export function deleteShare (id) {
  return {
    type: types.DELETE_SHARE,
    id
  };
}
