// Path Actions
import {ADD_PATH, GET_PATH, GET_ALL_PATHS, UPDATE_PATH, DELETE_PATH} from '../constants/ActionTypes';

export function addPath (title, body) {
  return {
    type: ADD_PATH,
    title: title,
		body: body
  };
}

export function getPath (id) {
  return {
    type: GET_PATH,
		id
  };
}

export function getAllPaths (id) {
  return {
    type: GET_ALL_PATHS,
		id
  };
}

export function updatePath (id) {
  return {
    type: UPDATE_PATH,
		id
  };
}

export function deletePath (id) {
  return {
    type: DELETE_PATH,
    id
  };
}
