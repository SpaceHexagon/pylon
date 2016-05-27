// GROUP Actions
import {ADD_GROUP, GET_GROUP, GET_ALL_GROUPS, UPDATE_GROUP, DELETE_GROUP} from '../constants/ActionTypes';

export function addGroup (title, body) {
  return {
    type: ADD_GROUP,
    title: title,
		body: body
  };
}

export function getGroup (id) {
  return {
    type: GET_GROUP,
		id
  };
}

export function getAllGroups (id) {
  return {
    type: GET_ALL_GROUPS,
		id
  };
}

export function updateGroup (id) {
  return {
    type: UPDATE_GROUP,
		id
  };
}

export function deleteGroup (id) {
  return {
    type: DELETE_GROUP,
    id
  };
}
