// Path Actions
import * as types from '../constants/ActionTypes';

export function addPath (title, body) {
  return {
    type: types.ADD_PATH,
    title: title,
		body: body
  };
}

export function getPath (id) {
  return {
    type: types.GET_PATH,
		id
  };
}

export function getAllPaths (id) {
  return {
    type: types.GET_ALL_PATHS,
		id
  };
}

export function updatePath (id) {
  return {
    type: types.UPDATE_PATH,
		id
  };
}

export function deletePath (id) {
  return {
    type: types.DELETE_PATH,
    id
  };
}
