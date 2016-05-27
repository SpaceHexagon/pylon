// File Actions
import {ADD_SHARE, GET_SHARE, GET_ALL_SHARES, UPDATE_SHARE, DELETE_SHARE} from '../constants/ActionTypes';

export function addShare (title) {
  return {
    type: ADD_SHARE,
    title: title
  };
}

export function getShare (id) {
  return {
    type: GET_SHARE,
		id
  };
}

export function getAllShares (id) {
  return {
    type: GET_ALL_SHARES,
		id
  };
}

export function updateShare (id, title) {
  return {
    type: UPDATE_SHARE,
		title: title,
		id: id
  };
}

export function deleteShare (id) {
  return {
    type: DELETE_SHARE,
    id
  };
}
