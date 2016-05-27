// File Actions
import {ADD_FILE, GET_FILE, GET_ALL_FILES, UPDATE_FILE, DELETE_FILE} from '../constants/ActionTypes';

export function addFile (title, body) {
  return {
    type: types.ADD_FILE,
    title: title,
		body: body
  };
}

export function getFile (id) {
  return {
    type: types.GET_FILE,
		id
  };
}

export function getAllFiles (id) {
  return {
    type: types.GET_ALL_FILES,
		id
  };
}

export function updateFile (id, title, body) {
  return {
    type: types.UPDATE_FILE,
		id: id,
		title: title,
		body: body
  };
}

export function deleteFile (id) {
  return {
    type: types.DELETE_FILE,
    id
  };
}
