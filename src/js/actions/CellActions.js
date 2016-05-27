// Cell Actions
import {ADD_CELL, GET_CELL, GET_ALL_CELLS, UPDATE_CELL, DELETE_CELL} from '../constants/ActionTypes';

export function addCell (title, body) {
  return {
    type: types.ADD_CELL,
    title: title,
		body: body
  };
}

export function getCell (id) {
  return {
    type: types.GET_CELL,
		id
  };
}

export function getAllCells (id) {
  return {
    type: types.GET_ALL_CELLS,
		id
  };
}

export function getChunkCells (id) {
  return {
    type: types.GET_CHUNK_CELLS,
		id
  };
}

export function updateCell (id) {
  return {
    type: types.UPDATE_CELLS,
		id
  };
}

export function deleteCell (id) {
  return {
    type: types.DELETE_CELL,
    id
  };
}
