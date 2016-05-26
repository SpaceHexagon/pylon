// File Actions
import * as types from '../constants/ActionTypes';

export function addFolder (title) {
  return {
    type: types.ADD_FOLDER,
    title: title
  };
}

export function getFolder (id) {
  return {
    type: types.GET_FOLDER,
		id
  };
}

export function getAllFolders (id) {
  return {
    type: types.GET_ALL_FOLDERS,
		id
  };
}

export function updateFolder (id, title, body) {
  return {
    type: types.UPDATE_FOLDER,
		id: id
  };
}

export function deleteFolder (id) {
  return {
    type: types.DELETE_FOLDER,
    id
  };
}
