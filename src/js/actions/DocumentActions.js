// Document Actions
import {ADD_PATH, GET_DOCUMENT, GET_ALL_DOCUMENTS, UPDATE_DOCUMENT, DELETE_DOCUMENT} from '../constants/ActionTypes';

export function addDocument (title, body) {
  return {
    type: types.ADD_DOCUMENT,
    title: title,
		body: body
  };
}

export function getDocument (id) {
  return {
    type: types.GET_DOCUMENT,
		id
  };
}

export function getAllDocument (id) {
  return {
    type: types.GET_ALL_DOCUMENTS,
		id
  };
}

export function updateDocument (id) {
  return {
    type: types.UPDATE_DOCUMENT,
		id
  };
}

export function deleteDocument (id) {
  return {
    type: types.DELETE_DOCUMENT,
    id
  };
}
