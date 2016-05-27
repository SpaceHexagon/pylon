// GROUP Actions
import * as types from '../constants/ActionTypes';

export function addGroup (title, body) {
  return {
    type: types.ADD_GROUP,
    title: title,
		body: body
  };
}

export function getGroup (id) {
  return {
    type: types.GET_GROUP,
		id
  };
}

export function getAllGroups (id) {
  return {
    type: types.GET_ALL_GROUPS,
		id
  };
}

export function updateGroup (id) {
  return {
    type: types.UPDATE_GROUP,
		id
  };
}

export function deleteGroup (id) {
  return {
    type: types.DELETE_GROUP,
    id
  };
}
