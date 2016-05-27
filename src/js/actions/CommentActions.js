// Comment Actions
import * as types from '../constants/ActionTypes';

export function addComment (title, body) {
  return {
    type: types.ADD_COMMENT,
    title: title,
		body: body
  };
}

export function getComment (id) {
  return {
    type: types.GET_COMMENT,
		id
  };
}

export function getAllComments (id) {
  return {
    type: types.GET_ALL_COMMENTS,
		id
  };
}

export function updateComment (id) {
  return {
    type: types.UPDATE_COMMENT,
		id
  };
}

export function deleteComment (id) {
  return {
    type: types.DELETE_COMMENT,
    id
  };
}
