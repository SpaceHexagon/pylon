// Building Actions
import * as types from '../constants/ActionTypes';

export function addBuilding (title, body) {
  return {
    type: types.ADD_BUILDING,
    title: title,
		body: body
  };
}

export function getBuilding (id) {
  return {
    type: types.GET_BUILDING,
		id
  };
}

export function getAllBuildings (id) {
  return {
    type: types.GET_ALL_BUILDINGS,
		id
  };
}

export function updateBuilding (id) {
  return {
    type: types.UPDATE_BUILDING,
		id
  };
}

export function deleteBuilding (id) {
  return {
    type: types.DELETE_BUILDING,
    id
  };
}
